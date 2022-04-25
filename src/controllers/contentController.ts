import { Request, Response } from 'express';
import * as contentServices from '../services/contentServices.js';

export async function listContentByInstructors(req: Request, res: Response) {
	const content = await contentServices.contentInstructors();
	res.send(content).status(200);
}

export async function listContentByTerms(req: Request, res: Response) {
	const content = await contentServices.contentTerms();
	res.send(content).status(200);
}