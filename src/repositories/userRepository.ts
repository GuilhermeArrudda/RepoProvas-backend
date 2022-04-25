import { prisma } from "../database.js";
import * as interfaces from "../services/userServices.js";

export async function findEmail(email: string) {
	const result = await prisma.user.findUnique({
		where: {
			email
		}
	})
	return result
}

export async function insertUser(user: interfaces.createUserData) {
	await prisma.user.create({
		data: user
	})
}

export async function findUserId(id: number) {
	const user = await prisma.user.findFirst({
		where: {
			id
		}
	})
	return user
}

export async function findSession(id: number) {
	const session = await prisma.session.findUnique({
		where: {
			id
		}
	})
	return session
}

export async function insertSession(createSession: interfaces.createSessionData) {
	const session = await prisma.session.create({
		data: createSession
	})
	return session
}