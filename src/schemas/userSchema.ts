import joi from 'joi'
import { createUserData } from '../services/userServices'

const userSchema = joi.object<createUserData>({
	email: joi.string().email().required(),
	password: joi.string().required()
})

export default userSchema