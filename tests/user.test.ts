import app from '../src/app.js'
import supertest from 'supertest'
import { prisma } from '../src/database.js'
import dotenv from 'dotenv'
import { userSchemaFactory } from './factories/userSchemaFactory.js'
import { tokenFactory } from './factories/tokenFactory.js'
import { userFactory } from './factories/userFactory.js'

describe('testing sign-up', () => {
	
	beforeEach(deleteAll)

	afterAll(disconnect)
	
	it('should return statusCode 201 and persist the user given a valid body', async () => {

		const result = await supertest(app).post('/sign-up').send(userSchemaFactory)
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
		const result = await supertest(app).post('/sign-up').send(data)
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

		const result = await supertest(app).post('/sign-up').send(body)
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

		const login = await supertest(app).post('/login').send(data)
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

async function deleteAll () {
	await prisma.$executeRaw`TRUNCATE TABLE users CASCADE`
}

async function disconnect() {
	await prisma.$disconnect()
}