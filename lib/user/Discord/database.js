import { PrismaClient } from '@prisma/client';

const CryptoJS = require('crypto-js');

const prisma = new PrismaClient();

const selectActions = ['findFirst', 'findMany', 'findUnique'];
const updateActions = ['create', 'createMany', 'update', 'updateMany', 'upsert'];

prisma.$use(async (params, next) => {
	if (params.model === 'Account') {
		if (selectActions.includes(await params.action)) {
			const result = await next(params);

			if (result.discordOAuthToken) {
				const byteDecrypted = await CryptoJS.AES.decrypt(result.discordOAuthToken, process.env.DB_ENCRYPTION);
				result.discordOAuthToken = byteDecrypted.toString(CryptoJS.enc.Utf8);
			}

			if (result.discordOAuthRegen) {
				const byteDecrypted = await CryptoJS.AES.decrypt(result.discordOAuthRegen, process.env.DB_ENCRYPTION);
				result.discordOAuthRegen = byteDecrypted.toString(CryptoJS.enc.Utf8);
			}

			return await result;
		}

		if (updateActions.includes(await params.action)) {
			if (params.args.data.discordOAuthRegen) {
				params.args.data.discordOAuthRegen = await CryptoJS.AES.encrypt(params.args.data.discordOAuthRegen, process.env.DB_ENCRYPTION).toString();
			}

			if (params.args.data.discordOAuthToken) {
				params.args.data.discordOAuthToken = await CryptoJS.AES.encrypt(params.args.data.discordOAuthToken, process.env.DB_ENCRYPTION).toString();
			}
			return await next(params);
		}
	}
	else {
		return next(params);
	}
});

// export async function addDiscord() {
//
// }
//
// export async function removeDiscord() {
//
// }
//
// export async function updateToken() {
//
// }