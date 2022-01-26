import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function userAccount(SteamID, SteamName, SteamAvatar) {
	const account = await prisma.account.findUnique({
		where: {
			steamId: SteamID,
		},
		include: {
			user: true,
		},
	});
	await prisma.$disconnect();

	if (account) {
		return await account;
	}
	else {
		return await userCreate(SteamID, SteamName, SteamAvatar);
	}
}

export async function userDelete(UserId) {
	await prisma.account.delete({
		where: {
			id: UserId,
		},
	});
}

export async function userCreate(SteamID, SteamName, SteamAvatar) {
	const newAccount = await prisma.account.create({
		data: {
			steamId: SteamID,
			user: {
				create: {
					name: SteamName,
					image: SteamAvatar,
				},
			},
		},
		include: {
			user: true,
		},
	});
	await prisma.$disconnect();
	return await newAccount;
}