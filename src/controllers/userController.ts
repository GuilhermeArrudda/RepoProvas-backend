import { Request, Response } from "express"
import * as userService from "../services/userServices.js"

export async function create(req: Request, res: Response){
	const createUserData = req.body
	await userService.create(createUserData)

	res.sendStatus(201)
}

export async function login(req: Request, res: Response) {
	const createSessionData = req.body

	const token = await userService.login(createSessionData)
	console.log(token)
	res.status(200).send(token)
}