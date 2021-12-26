import {getSession} from "next-auth/react";

const SteamAuth = require("node-steam-openid");

const steam = new SteamAuth({
    realm: process.env.SITE_URL,
    returnUrl: `${process.env.SITE_URL}/api/user/steam/callback`,
    apiKey: process.env.STEAM_API_KEY
});

export default async function steamConnect(req, res) {
    const session = await getSession({req});

    const reqJSONString = JSON.stringify(req.query)
    const reqQuery = await JSON.parse(reqJSONString);

    if (await session) {
        if (await reqQuery.connect === 'connect') {
            try {
                await res.redirect(302, await steam.getRedirectUrl());
            } catch (err) {
                await res.status(500).send({ error: 'internal server error'});
            }
        } else if (await reqQuery.connect === 'callback') {
            try {
                const steamUser = await steam.authenticate(req);

                const sessionUser =  steamUser.steamId;


                res.redirect(302, `${process.env.SITE_URL}`)
                res.end();
            } catch (err) {
                await res.status(500).send({ error: 'internal server error'});
            }

        } else {
            await res.status(404).send({ error: 'page not found'});
        }
    } else {
        await res.status(401).send({ error: 'unauthorized'});
    }

    await res.status(100);
    await res.end();
}