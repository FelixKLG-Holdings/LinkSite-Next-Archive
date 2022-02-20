const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const sId = Math.floor(Math.random() * 100000000);
    const sId1 = Math.floor(Math.random() * 100000000);

    await prisma.account.create({
        data: {
            steamId: sId, user: {
                create: {
                    name: 'FelixKLG',
                    image: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/1f/1f1802babee511aab9a7ba0fbd5673fd9363967c_full.jpg'
                },
            }, discord: {
                create: {
                    id: BigInt(Math.floor(Math.random() * 100000000)),
                    username: 'Wumpus',
                    discrim: '0001',
                    token: 'test',
                    regenToken: 'tes',
                    tokenExp: Math.floor(Math.random() * 100000000),
                },
            },
        },
    });

    await prisma.account.update({
        where: {
            steamId: BigInt(sId),
        }, data: {
            discord: {
                update: {
                    token: 'penbis', regenToken: 'heheFunny'
                }
            }
        }
    });

    await prisma.account.create({
        data: {
            steamId: BigInt(sId1),
            user: {
                create: {
                    name: 'FelixKLG',
                    image: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/1f/1f1802babee511aab9a7ba0fbd5673fd9363967c_full.jpg'
                },
            },
        },
    });

    await prisma.account.update({
        where: {
            steamId: BigInt(sId1),
        }, data: {
            discord: {
                create: {
                    token: 'penis', regenToken: 'penbis', tokenExp: Math.floor(Math.random() * 100000000),
                }
            }
        }
    })

    await prisma.account.delete({
        where: {
            steamId: BigInt(sId)
        }
    })
    await prisma.account.delete({
        where: {
            steamId: BigInt(sId1)
        }
    })
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
