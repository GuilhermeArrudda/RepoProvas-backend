import { faker } from '@faker-js/faker';
import { Inputs } from '../../src/services/contentServices.js';
import * as contentRepository from '../../src/repositories/contentRepository.js';
import { prisma } from '../../src/database.js';
import { CreateTest } from '../../src/services/contentServices.js';

export function createTestBody(): Inputs {
	return {
		name: faker.lorem.words(),
		pdfUrl: faker.internet.url(),
		category: 'P1',
		discipline: 'Geografia',
		teacher: 'Pedro Paulo',
	};
}

export async function createTestDatabase(testData: Inputs) {
	const { category, discipline, teacher, pdfUrl, name } = testData;

	const teacherId = await contentRepository.getInstructorByName(teacher);
	const disciplineId = await contentRepository.getDisciplinesByName(discipline);
	const categoryId = await contentRepository.getCategoriesByName(category);
	const teacherDisciplineId = await contentRepository.getTeacherDiscipline(teacherId.id, disciplineId.id);

	const data: CreateTest = {
		name,
		pdfUrl,
		categoryId: categoryId.id,
		teacherDisciplineId: teacherDisciplineId.id,
		disciplineId: disciplineId.id,
	};

	return await prisma.test.create({
		data: data
	});
}