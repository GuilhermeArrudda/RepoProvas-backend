import { Request, Response, NextFunction } from "express";
import { TypeError } from "../utils/errors.js";

export function errorsHandlerMiddleware(err: Error | TypeError, req: Request, res: Response, next: NextFunction) {

	if('type' in err) {
		if(err.type === 'unauthorized'){
			return res.status(err.code).send(err.message)
		}
		if(err.type === "not_found") {
			return res.status(err.code).send(err.message)
		}
		if(err.type === "conflict") {
			return res.status(err.code).send(err.message)
		}
		if(err.type === "invalid_input") {
			return res.status(err.code).send(err.message)
		}
		if(err.type == "forbidden") {
			return res.status(err.code).send(err.message)
		}
	}
	res.sendStatus(500)
}