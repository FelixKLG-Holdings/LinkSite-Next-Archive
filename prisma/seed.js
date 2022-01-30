const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
	await prisma.account.create({
		data: {
			steamId: '123456789',
			user: {
				create: {
					name: 'FelixKLG',
					image: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/1f/1f1802babee511aab9a7ba0fbd5673fd9363967c_full.jpg'
				},
			},
			discord: {
				create: {
					id: '123456789',
					username: 'Wumpus',
					discrim: '0001',
					token: 'test',
					regenToken: 'tes',
					tokenExp: 123,
				},
			},
		},
	});
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
