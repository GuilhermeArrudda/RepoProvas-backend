import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { findUserId } from '../repositories/userRepository.js';
import * as errors from '../utils/errors.js'

export async function validateToken(req: Request, res: Response, next: NextFunction) {
	const authorization = req.headers.authorization;
	const token = authorization?.replace('Bearer ', '');
 const secretKey = process.env.JWT_SECRET;
	
	if (!token) {
		throw errors.notFound('Token not found')
	}

	const data = jwt.verify(token, secretKey) as { userId: number };
	if (!data) {		
		throw errors.unauthorized('Invalid token')
	}
	
	const user = await findUserId(data.userId);
	if (!user) {
		throw errors.unauthorized('User not found')
	}

	res.locals.user = user;
	next();
}