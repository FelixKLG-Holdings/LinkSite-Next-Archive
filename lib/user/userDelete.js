import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export async function userDelete(UserId) {
    await prisma.account.delete({
        where: {
            id: UserId
        }
    })
}