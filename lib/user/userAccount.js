import { PrismaClient } from '@prisma/client';
import { userCreate } from 'lib/user/userCreate';

const prisma = new PrismaClient()

export async function userLogin(SteamID, SteamName, SteamAvatar) {
    const account = await prisma.account.findUnique({
        where: {
            steamId: SteamID,
        },
        include: {
            user: true,
        }
    })
    await prisma.$disconnect();

    if (account) {
        return await account;
    } else {
        return await userCreate(SteamID, SteamName, SteamAvatar)
    }
}