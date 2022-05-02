import supertest from "supertest";
import app from "../../src/app.js";
import { userFactory } from "./userFactory.js";
import { userSchemaFactory } from "./userSchemaFactory.js";

export async function tokenFactory() {
	const data = userSchemaFactory

	await userFactory(data)

	const result = await supertest(app).post('/login').send(data)

	return result.text
}