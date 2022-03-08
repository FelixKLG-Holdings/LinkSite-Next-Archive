import { PrismaClient } from '@prisma/client';

const CryptoJS = require('crypto-js');

const prisma = new PrismaClient();

const selectActions = ['findFirst', 'findMany', 'findUnique'];

/**
 * Encrypt value argument
 * @param {string} value
 * @returns {Promise<*>}
 */
async function tokenEncrypt(value) {
	return await CryptoJS.AES.encrypt(value, process.env.ENCRYPTION_KEY).toString();
}

/**
 * Decrypt value argument
 * @param {string} value
 * @returns {Promise<string>}
 */
async function tokenDecrypt(value) {
	const byteDecrypted = await CryptoJS.AES.decrypt(value, process.env.ENCRYPTION_KEY);
	return byteDecrypted.toString(CryptoJS.enc.Utf8);
}

/**
 * Middleware for database decryption
 */
prisma.$use(async (params, next) => {
	if (params.model === 'Account' && selectActions.includes(await params.action)) {
		const result = await next(params);

		if (result.discord.token) {
			result.discord.token = await tokenDecrypt(result.discord.token);
		}

		if (result.discord.regenToken) {
			result.discord.regenToken = await tokenDecrypt(result.discord.regenToken);
		}
		return await result;
	}
	else {
		return next(params);
	}
});

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
export async function addDiscordId(session, user) {

	const userId = session.id;
	const { id } = await user;

	prisma.account.update({
		where: {
			id: userId,
		}, data: {
			update: {
				discord: {
					id: BigInt(id),
				},
			},
		},
	});

	await prisma.$disconnect();
}

export async function updateDiscordInfo(session, user) {
	console.log(user);
}

export async function removeDiscord(session) {

	const { id } = session;

	prisma.account.update({
		where: {
			id: id,
		},
		data: {
			delete: {
				discord: true,
			},
		},
	});
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
	return await discordToken.discord.token;
}