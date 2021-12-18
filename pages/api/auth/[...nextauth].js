import NextAuth from "next-auth";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    debug: false,
    providers: [
        {
            id: "discord",
            name: "Discord",
            type: "oauth",
            authorization:
                "https://discord.com/api/oauth2/authorize?scope=identify+email+guilds+guilds.join",
            token: "https://discord.com/api/oauth2/token",
            userinfo: "https://discord.com/api/users/@me",
            profile(profile) {
                if (profile.avatar === null) {
                    const defaultAvatarNumber = parseInt(profile.discriminator) % 5
                    profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`
                } else {
                    const format = profile.avatar.startsWith("a_") ? "gif" : "png"
                    profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`
                }
                return {
                    id: profile.id,
                    name: profile.username,
                    email: profile.email,
                    image: profile.image_url,
                }
            },
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
        }
    ],
    secret: process.env.NEXTAUTH_SECRET,
})