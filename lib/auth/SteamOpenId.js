const SteamAuth = require('node-steam-openid');

const steam = new SteamAuth({
    realm: process.env.SITE_URL,
    returnUrl: `${process.env.SITE_URL}/api/auth/login/callback`,
    apiKey: process.env.STEAM_API_KEY
})

export async function getOpenIDLink() {
    return await steam.getRedirectUrl();
}

export async function OpenIDValidate(req, res) {
    try {
        return await steam.authenticate(req);
    } catch (error) {
        res.status(400).send('bad request')
    }
}