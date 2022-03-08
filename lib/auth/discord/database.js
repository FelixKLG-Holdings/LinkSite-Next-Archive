import { PrismaClient } from '@prisma/client';
import { tokenEncrypt, tokenDecrypt } from 'lib/secure/encryption';

const prisma = new PrismaClient();

/**
 * Create Discord entry for the session user
 * @param {object} session
 * @param {object} result
 * @returns {Promise<void>}
 */
export async function setDiscordToken(session, result) {

	const { id } = session;
	const { access_token, expires_in, refresh_token } = await result;

	await prisma.account.update({
		where: {
			id: id,
		},
		data: {
			discord: {
				upsert: {
					create: {
						token: await tokenEncrypt(access_token),
						regenToken: await tokenEncrypt(refresh_token),
						tokenExp: new Date(Date.now() + expires_in),
					},
					update: {
						token: await tokenEncrypt(access_token),
						regenToken: await tokenEncrypt(refresh_token),
						tokenExp: new Date(Date.now() + expires_in),
					},
				},
			},
		},
	});

	await prisma.$disconnect();
}

/**
 * Assign Discord ID for the session user
 * @param {object} session
 * @param {object} user
 * @returns {Promise<void>}
 */
export async function addDiscordInfo(session, user) {

	const userId = session.id;
	const { id, username, discriminator, avatar } = await user;

	await prisma.account.update({
		where: {
			id: userId,
		}, data: {
			discord: {
				update: {
					id: BigInt(id),
					username: username,
					discrim: parseInt(discriminator),
					avatar: avatar,
				},
			},
		},
	});

	await prisma.$disconnect();
}

export async function removeDiscord(session) {

	const { id } = session;

	await prisma.account.update({
		where: {
			id: id,
		},
		data: {
			discord: {
				delete: true,
			},
		},
	});

	await prisma.$disconnect();
}


/**
 * Retrieve Discord OAuth token for session user
 * @param session
 * @returns {Promise<*>}
 */
export async function getDiscordToken(session) {

	const { id } = session;

	const discordToken = await prisma.account.findUnique({
		where: {
			id: id,
		}, select: {
			discord: {
				select: {
					token: true,
				},
			},
		},
	});

	await prisma.$disconnect();
	return await tokenDecrypt(discordToken.discord.token);
}

export async function getDiscord(session) {
	const { id } = session;

	const response = await prisma.account.findUnique({
		where: {
			id: id,
		}, select: {
			discord: {
				select: {
					id: true,
					username: true,
					discrim: true,
					avatar: true,
					token: false,
					regenToken: false,
					tokenExp: false,
				},
			},
		},
	});

	await prisma.$disconnect();
	return await response;
}
