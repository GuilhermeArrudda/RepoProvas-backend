import * as contentRepository from '../repositories/contentRepository.js';

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