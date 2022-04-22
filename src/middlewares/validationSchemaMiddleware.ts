import { Request, Response, NextFunction } from 'express'
import { Schema } from 'joi'
import * as errors from '../utils/errors.js'

export default function validationSchemaMiddleware(schema: Schema) {
	return (req: Request, res: Response, next: NextFunction) => {
		const validation = schema.validate(req.body)
		if(validation.error){
			throw errors.invalidInput("Invalid data")
		}
		next()
	}
}