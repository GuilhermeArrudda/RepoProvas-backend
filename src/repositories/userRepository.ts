import { prisma } from "../database.js";
import { createUserData } from "../services/userServices.js";

export async function findEmail(email: string) {
	const result = await prisma.user.findUnique({
		where: {
			email
		}
	})
	return result
}

export async function insert(user: createUserData) {
	await prisma.user.create({
		data: user
	})
}