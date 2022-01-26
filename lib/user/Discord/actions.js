const DiscordOAuth = require('discord-oauth2');
const oauth = new DiscordOAuth({
	clientId: process.env.DISCORD_CLIENT_ID,
	clientSecret: process.env.DISCORD_CLIENT_SECRET,
	redirectUri: `${process.env.SITE_URL}/api/user/discord/callback`,

});

export async function getOAuthToken(grantCode, session) {
	const discordCallback = await oauth.tokenRequest({
		code: grantCode,
		scope: 'identify email guilds guilds.join guilds.members.read',
		grantType: 'authorization_code',
	});
}
