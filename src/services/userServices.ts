import { user } from '@prisma/client'
import * as userRepository from '../repositories/userRepository.js'
import * as errors from '../utils/errors.js'
import bcrypt from 'bcrypt'

export type createUserData = Omit<user, "id">

export async function create(createUserData: createUserData) {
	const { email, password } = createUserData

	const existingEmail = await userRepository.findEmail(email)
	if(existingEmail){
		throw errors.conflict("This email already exist")
	}

	const hashedPassword = bcrypt.hashSync(password, 10)

	await userRepository.insert({ ...createUserData, password: hashedPassword })
}