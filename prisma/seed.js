const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const user1 = await prisma.account.upsert({
        where: { steamId: '76561198250930688' },
        update: {},
        create: {
            steamId: '76561198250930688',
            discordId: '270150443512889344',
            oauthTokenSecret: 'penis',
            oauthToken: 'penis2',
            expiresAt: 123,
            user: {
                create: {
                    name: 'penis',
                    email: 'penis@penis.co',
                    image : 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/1f/1f1802babee511aab9a7ba0fbd5673fd9363967c_full.jpg'
                }
            }
        },
    })

    console.log({ user1 })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
