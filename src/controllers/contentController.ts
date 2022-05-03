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

export async function listDisciplines(req: Request, res: Response) {
	const content = await contentServices.disciplinesList()
	res.status(200).send(content)
}

export async function listDisciplinesByName(req: Request, res: Response) {
	const { name } = req.params;
	
	const content = await contentServices.disciplinesByName(name);
	res.status(200).send(content);
}

export async function listCategories(req: Request, res: Response) {
	const content = await contentServices.categoriesList()
	res.status(200).send(content)
}

export async function listDisciplinesById(req: Request, res: Response) {
	const { id } = req.params;
	const content = await contentServices.disciplinesById(parseInt(id));

	res.status(200).send(content);
}

export async function updateViews(req: Request, res: Response) {
	const { id } = req.params;
	await contentServices.updateViews(parseInt(id))
	res.sendStatus(200)
}