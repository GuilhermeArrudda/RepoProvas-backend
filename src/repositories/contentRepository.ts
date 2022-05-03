import { prisma } from '../database.js';

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