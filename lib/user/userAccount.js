import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Get user account information via SteamID
 * @param SteamUser
 * @returns {Promise<*>}
 */
export async function userAccount(SteamUser) {

	const { steamid } = await SteamUser;

	const account = await prisma.account.findUnique({
		where: {
			steamId: BigInt(steamid),
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
 * Delete a user account via account Id
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
 * Create a new user account
 * @param SteamUser
 * @returns {Promise<*>}
 */
export async function userCreate(SteamUser) {

	const { steamid, username, avatar } = SteamUser;

	const newAccount = await prisma.account.create({
		data: {
			steamId: BigInt(steamid),
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