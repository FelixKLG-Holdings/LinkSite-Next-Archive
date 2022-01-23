import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient()

export async function create(SteamID, SteamName, SteamAvatar) {
    const newAccount = await prisma.account.create({
        data: {
            steamId: SteamID,
            user: {
                create: {
                    name: SteamName,
                    image: SteamAvatar
                }
            }
        },
        include: {
            user: true,
        }
    });
    await prisma.$disconnect();
    return await newAccount;
}