import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 *
 * @param SteamUser
 * @returns {Promise<*>}
 */
export async function userAccount(SteamUser) {

	const { steamid } = await SteamUser;

	const account = await prisma.account.findUnique({
		where: {
			steamId: steamid,
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
		return await userCreate(SteamUser);
	}
}

/**
 *
 * @param UserId
 * @returns {Promise<void>}
 */
export async function userDelete(UserId) {
	await prisma.account.delete({
		where: {
			id: UserId,
		},
	});
	await prisma.$disconnect();
}

/**
 *
 * @param SteamUser
 * @returns {Promise<*>}
 */
export async function userCreate(SteamUser) {

	const { steamid, username, avatar } = SteamUser;

	const newAccount = await prisma.account.create({
		data: {
			steamId: steamid,
			user: {
				create: {
					name: username,
					image: avatar.medium,
				},
			},
		},
	});
	await prisma.$disconnect();
	return await newAccount;
}