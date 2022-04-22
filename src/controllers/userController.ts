import { Request, Response } from "express"
import * as userService from "../services/userServices.js"

export async function create(req: Request, res: Response){
	const createUserData = req.body
	await userService.create(createUserData)

	res.sendStatus(201)
}