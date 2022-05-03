import { number } from 'joi';
import { prisma } from '../database.js';
import { CreateTest } from '../services/contentServices.js';

export async function getInstructor() {
	return await prisma.teacher.findMany({
		select: {
			id: true,
			name: true,
			teachersDisciplines: {
				select: {
					disciplines: true
				}
			}
		},
	});
}

export async function getCategories(instructorId: number) {
	const tests = await prisma.category.findMany({
		select: {
			id: true,
			name: true,
			tests: {
				where: {
					teachersDisciplines: {
						teacherId: instructorId,
					},
				},
				select: {
					id: true,
					name: true,
					pdfUrl: true,
					views: true,
					teachersDisciplines: {
						select: {
							disciplines: {
								select: {
									name: true,
								},
							},
						},
					},
				},
			},
		},
	});
	return tests;
}

export async function getDisciplinesByTerms() {
	return await prisma.term.findMany({
		select: {
			id: true,
			number: true,
			disciplines: {
				select: {
					id: true,
					name: true,
				},
			},
		},
	});
}

export async function getTestsByDiscipline(id: number) {
	return await prisma.category.findMany({
		select: {
			name: true,
			tests: {
				where: {
					id
				},
				select: {
					id: true,
					name: true,
					pdfUrl: true,
					views: true,
					teachersDisciplines: {
						select: {
							teachers: {
								select: {
									name: true
								}
							}
						}
					}
				}
			},
		}
	})
}

export async function getAllDisciplines() {
	return await prisma.discipline.findMany({
		select: {
			name: true,
			id: true
		}
	})
}

export async function getDisciplinesByName(name: string) {
	return await prisma.discipline.findUnique({
		where: { name },
	});
}

export async function getCategoriesList() {
	return await prisma.category.findMany({
		select: {
			id: true,
			name: true,
		},
	});
}

export async function updateViews(id: number) {
	return await prisma.test.update({
		where: {
			id
		},
		data: { views: { increment: 1 } }
	})
}

export async function getInstructorByName(name: string) {
	return await prisma.teacher.findUnique({
		where: { name }
	})
}

export async function getCategoriesByName(name: string) {
	return await prisma.category.findUnique({
		where: { name }
	})
}

export async function getTeacherDiscipline(teacherId: number, disciplineId: number){
	return await prisma.teacherDiscipline.findFirst({
		where: {
			AND: [{ disciplineId }, { teacherId }]
		}
	})
}

export async function createTest(data: CreateTest) {
	return await prisma.test.create({
		data: data
	})
}