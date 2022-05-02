import { prisma } from "../../src/database.js";
import bcrypt from "bcrypt"
import { user } from "@prisma/client";

type createUserData = Omit<user, "id">

export async function userFactory(userSchemaFactory: createUserData) {
	await prisma.user.create({
		data: {
			...userSchemaFactory,
			password: bcrypt.hashSync(userSchemaFactory.password, 10)
		}
	})
}