import app from '../../src/app.js'
import supertest from 'supertest'
import { prisma } from '../../src/database.js'
import { userSchemaFactory } from '../factories/userSchemaFactory.js'
import { tokenFactory } from '../factories/tokenFactory.js'
import { userFactory } from '../factories/userFactory.js'
import { createTestBody, createTestDatabase } from '../factories/testFactory.js'

const agent = supertest(app)

describe('testing sign-up', () => {
	
	beforeEach(deleteAll)

	afterAll(disconnect)
	
	it('should return statusCode 201 and persist the user given a valid body', async () => {

		const result = await agent.post('/sign-up').send(userSchemaFactory)
		const status = result.status

		const userCreated = await prisma.user.findUnique({
			where: {email: userSchemaFactory.email}
		})

		expect(status).toEqual(201)
		expect(userCreated).not.toBeNull()
	})

	it('should return statusCode 409 given a duplicate email', async () => {

		const data = userSchemaFactory

		userFactory(data)
		const result = await agent.post('/sign-up').send(data)
		const status = result.status

		const onlyOneUser = await prisma.user.findMany({
			where: {email: data.email}
		})

		expect(status).toEqual(409)
		expect(onlyOneUser.length).toEqual(1)
	})

	it('should return statusCode 422 given a invalid body', async () => {
		const body = {
			email: 'test',
			password: '123456'
		}

		const result = await agent.post('/sign-up').send(body)
		const status = result.status

		const userCreated = await prisma.user.findUnique({
			where: {email: body.email}
		})

		expect(status).toEqual(422)
		expect(userCreated).toBeNull()
	})
})

describe('testing login', () => {

	beforeEach(deleteAll)

	afterAll(disconnect)

	it('should return statusCode 200 and create session', async () => {

		const data = userSchemaFactory

		userFactory(data)

		const login = await agent.post('/login').send(data)
		const status = login.status
		const userFind = await prisma.user.findUnique({
			where: {email: userSchemaFactory.email}
		})

		const createSession = await prisma.session.create({
			data: {userId: userFind.id}
		})

		expect(status).toEqual(200)
		expect(createSession).not.toBeNull()
	})

	it('should return statusCode 401 if credentials are invalid', async () => {

		const data = userSchemaFactory

		userFactory(data)

		const login = await supertest(app).post('/login').send({...data, password: "123"})
		const status = login.status

		expect(status).toEqual(401)
	})

	it('should return statusCode 422', async () => {

		const body = {
			test: "test",
			password: '123456'
		}

		const login = await supertest(app).post('/login').send(body)
		const status = login.status

		expect(status).toEqual(422)
	})
})

describe('testing token', () => {

	beforeEach(deleteAll)

	afterAll(disconnect)

	it('should return statusCode 200', async () => {

		const token = await tokenFactory()
		const validateToken = await supertest(app).post('/token').set('Authorization', token)

		expect(validateToken.status).toEqual(200)
	})

	it('should return statusCode 404', async () => {

		const token = await tokenFactory()
		const validateToken = await supertest(app).post('/token').set('test', token)

		expect(validateToken.status).toEqual(404)
	})

	it('should return statusCode 401', async () => {
		const token = `1234`
		const validateToken = await supertest(app).post('/token').set('Authorization', token)

		expect(validateToken.status).toEqual(401)
	})
})

describe('testing content/teachers', () => {
	beforeEach(deleteAll)

	afterAll(disconnect)

	it('should return 200 and a array with content given a valid token', async () => {
		const token = await tokenFactory();

		const result = await agent.get('/content/teachers').set('Authorization', `Bearer ${token}`);
		const status = result.status
		const body = result.body

		expect(status).toEqual(200);
		expect(body).not.toBe(null);
	});

	it('should return statusCode 401 given a invalid token', async () => {
		const result = await agent.get('/content/teachers').set('Authorization', `Bearer 123456`);
		const status = result.status

		expect(status).toEqual(401);
	});
});

describe('testing content/terms', () => {
	beforeEach(deleteAll)

	afterAll(disconnect)

	it('should return statusCode 200 and a array with content given a valid token', async () => {
		const token = await tokenFactory();

		const result = await agent.get('/content/terms').set('Authorization', `Bearer ${token}`);
		const status = result.status
		const body = result.body

		expect(status).toEqual(200);
		expect(body).not.toBe(null);
	});

	it('should return statusCode 401 given a invalid token', async () => {
		const result = await agent.get('/content/terms').set('Authorization', `Bearer 123456`);
		const status = result.status
		expect(status).toEqual(401);
	});
});

describe('testing content/disciplines', () => {
	beforeEach(deleteAll)

	afterAll(disconnect)

	it('should return statusCode 200 and a array with content given a valid token', async () => {
		const token = await tokenFactory();

		const result = await agent.get('/content/disciplines').set('Authorization', `Bearer ${token}`);
		const status = result.status
		const body = result.body
		expect(status).toEqual(200);
		expect(body).not.toBe(null);
	});

	it('should return statusCode 401 given a invalid token', async () => {
		const result = await agent.get('/content/disciplines').set('Authorization', `Bearer 123456`);
		const status = result.status
		expect(status).toEqual(401);
	});
});

describe('testing content/discipline/:name', () => {
	beforeEach(deleteAll)

	afterAll(disconnect)

	it('should return statusCode 200 and a array with content given a valid params and token', async () => {
		const token = await tokenFactory();
		const { name } = await prisma.discipline.findFirst();

		const result = await agent.get(`/content/discipline/${name}`).set('Authorization', `Bearer ${token}`);
			const status = result.status
			const body = result.body

		expect(status).toEqual(200);
		expect(body).not.toBe(null);
		expect(body.name).toEqual(name);
	});

	it('should return statusCode 404 given invalid params', async () => {
		const token = await tokenFactory();
		const name = '';

		const result = await agent.get(`/content/discipline/${name}`).set('Authorization', `Bearer ${token}`);
		const status = result.status
		expect(status).toEqual(404);
	});
});

describe('testing content/discipline/:id', () => {
	beforeEach(deleteAll)

	afterAll(disconnect)

	it('should return statusCode 200 and a array with content given a valid params and token', async () => {
		const token = await tokenFactory();
		const { id } = await prisma.discipline.findFirst();

		const result = await agent.get(`/content/disciplines/${id}`).set('Authorization', `Bearer ${token}`);
		const status = result.status
		const body = result.body
		expect(status).toEqual(200);
		expect(body).not.toBe(null);
	});

	it('should return statusCode 422 given invalid params', async () => {
		const token = await tokenFactory();
		const id = 'abc';

		const result = await agent.get(`/content/disciplines/${id}`).set('Authorization', `Bearer ${token}`);
		const status = result.status
		expect(status).toEqual(422);
	});
});

describe('testing content/categories', () => {
	beforeEach(deleteAll)

	afterAll(disconnect)

	it('should return statusCode 200 and a array with content given a valid token', async () => {
		const token = await tokenFactory();

		const result = await agent.get('/content/disciplines').set('Authorization', `Bearer ${token}`);
		const status = result.status
		const body = result.body

		expect(status).toEqual(200);
		expect(body).not.toBe(null);
	});

	it('should return statusCode 401 given a invalid token', async () => {
		const result = await agent.get('/content/teachers').set('Authorization', `Bearer 123456`);
		const status = result.status
		expect(status).toEqual(401);
	});
});

describe('testing /tests/create', () => {
	beforeEach(deleteAll)

	afterAll(disconnect)

	it('should return statusCode 201 and persist test in database given valid body', async() => {
		const token = await tokenFactory();
		const body = createTestBody();

		const result = await agent.post('/tests/create').send(body).set('Authorization', `Bearer ${token}`);
		const status = result.status
		const test = await prisma.test.findFirst({
			where: { name: body.name }
		})

		expect(status).toEqual(201);
		expect(test).not.toBeNull();
	});

	it('should return statusCode 200 given a invalid body', async () => {
		const token = await tokenFactory();
		const body = {};

		const result = await agent.post('/tests/create').send(body).set('Authorization', `Bearer ${token}`);
		const status = result.status
		expect(status).toEqual(200);
	});

	it('should return statusCode 401 given a invalid token', async () => {
		const result = await agent.post('/tests/create').set('Authorization', `Bearer 123456`);
		const status = result.status
		expect(status).toEqual(401);
	});
});
describe('testing content/views/:id', () => {
	beforeEach(deleteAll)

	afterAll(disconnect)

	it('should return statusCode 200 given a valid token and valid params', async () => {
		const token = await tokenFactory();
		const testBody = createTestBody();
		await createTestDatabase(testBody);
		const { id } = await prisma.test.findFirst();

		const result = await agent.patch(`/content/views/${id}`).set('Authorization', `Bearer ${token}`);
			const status = result.status
		const body = result.body
		expect(status).toEqual(200);
		expect(body).not.toBe(null);

		await prisma.$executeRaw`TRUNCATE TABLE tests;`;
	});

	it('should return statusCode 404 given invalid params', async () => {
		const token = await tokenFactory();
		const id = -1;

		const result = await agent.patch(`/test/${id}`).set('Authorization', `Bearer ${token}`);
		const status = result.status
		expect(status).toEqual(404);
	});
});

async function deleteAll () {
	await prisma.$executeRaw`TRUNCATE TABLE users CASCADE`
}

async function disconnect() {
	await prisma.$disconnect()
}