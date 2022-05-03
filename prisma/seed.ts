import { prisma } from "../src/database.js";

async function main() {
	await prisma.category.upsert({
		where: { name: 'P1' },
		update: {},
		create: {
			name: 'P1'
		}
	});

	await prisma.term.upsert({
		where: { number: 1 },
		update: {},
		create: {
				number: 1
		}
	});

	await prisma.discipline.upsert({
		where: { name: 'Geografia'},
		update: {},
		create: {
				name: 'Geografia',
				termId: 1
		}
	});

	await prisma.teacher.upsert({
			where: { name: 'Pedro Paulo' },
			update: {},
			create: {
					name: 'Pedro Paulo'
			}
	});

	await prisma.teacherDiscipline.upsert({
		where: { id: 1 },
		update: {},
		create: {
				disciplineId: 1,
				teacherId: 1
		}
	});
}
main()

	.catch((error) => {
		console.log(error);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});