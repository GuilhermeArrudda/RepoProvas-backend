import { session, user } from '@prisma/client'
import * as userRepository from '../repositories/userRepository.js'
import * as errors from '../utils/errors.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export type createUserData = Omit<user, "id">
export type createSessionData = Omit<session, "id">

export async function create(createUserData: createUserData) {
	const { email, password } = createUserData

	const existingEmail = await userRepository.findEmail(email)
	if(existingEmail){
		throw errors.conflict("This email already exist")
	}

	const hashedPassword = bcrypt.hashSync(password, 10)

	await userRepository.insertUser({ ...createUserData, password: hashedPassword })
}

export async function login(createSessionData: createUserData) {
	const { email, password } = createSessionData

	const user = await userRepository.findEmail(email)

	if(!user){
		throw errors.unauthorized('Incorrect email or password')
	}

	if(!bcrypt.compareSync(password, user.password)){
		throw errors.unauthorized('Incorrect email or password')
	}
	const session = await userRepository.insertSession({userId: user.id})
	console.log(session)
	const secretKey = process.env.JWT_SECRET
	console.log(secretKey)
	const token = jwt.sign(session.id.toString(), secretKey)
	console.log(token)

	return token
}