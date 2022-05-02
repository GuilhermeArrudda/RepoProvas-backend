import { faker } from "@faker-js/faker"

	export const userSchemaFactory = {
		email: faker.internet.email(),
		password: faker.lorem.word()
	}