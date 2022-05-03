import { test } from '@prisma/client';
import * as contentRepository from '../repositories/contentRepository.js';

export interface Inputs {
	name: string;
	pdfUrl: string;
	category: string;
	discipline: string;
	teacher: string;
}


export type CreateTest = Omit<test, 'id' | 'views'>

export async function contentInstructors() {
	const teachers = await contentRepository.getInstructor();
	const array = [];

	for (const teacher of teachers) {
		const categories = await contentRepository.getCategories(teacher.id);
        
		const result = {
			id: teacher.id,
			teacherName: teacher.name,
			disciplines: teacher.teachersDisciplines.map(
				(d) => d.disciplines.name
			),
			categories,
		};

		array.push(result);
	}

	return array;
}

export async function contentTerms() {
	const terms = await contentRepository.getDisciplinesByTerms();

	return terms;
}

export async function disciplinesList() {
	const disciplines = await contentRepository.getAllDisciplines()

	return disciplines
}

export async function disciplinesByName(name: string) {
	return await contentRepository.getDisciplinesByName(name)
}

export async function categoriesList() {
	return await contentRepository.getCategoriesList();
}

export async function disciplinesById(id: number) {
	const discipline = contentRepository.getTestsByDiscipline(id);

	return discipline;
}

export async function updateViews(id: number) {
	return await contentRepository.updateViews(id)
}

export async function create(info: Inputs) {
	const { 
		name,
		pdfUrl,
		category,
		discipline,
		teacher } = info

		const categoryId = await contentRepository.getCategoriesByName(category)
		const disciplineId = await contentRepository.getDisciplinesByName(discipline)
		const teacherId = await contentRepository.getInstructorByName(teacher)
		const teacherDisciplineId = await contentRepository.getTeacherDiscipline(teacherId.id, disciplineId.id)

		const data = {
			name,
			pdfUrl,
			categoryId: categoryId.id,
			teacherDisciplineId: teacherDisciplineId.id,
			disciplineId: disciplineId.id
		}
		
		return await contentRepository.createTest(data)
}