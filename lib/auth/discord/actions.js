const DiscordOAuth = require('discord-oauth2');

const OAuth = new DiscordOAuth({
	clientId: process.env.DISCORD_CLIENT_ID,
	clientSecret: process.env.DISCORD_CLIENT_SECRET,
	redirectUri: `${process.env.SITE_URL}/api/connections/discord/callback`,
});

/**
 * Request OAuth tokens for a user from the code returned from the grant
 * @param {string} grantCode
 * @returns {Promise<OAuth.TokenRequestResult>}
 */
export async function getToken(grantCode) {
	return await OAuth.tokenRequest({
		code: grantCode,
		scope: 'identify email guilds guilds.join guilds.members.read',
		grantType: 'authorization_code',
	});
}

/**
 * Revokes token argument
 * @param {string} token
 * @returns {Promise<string>}
 */
export async function revokeToken(token) {
	const credentials = Buffer.from(`${process.env.DISCORD_CLIENT_ID}:${process.env.DISCORD_CLIENT_SECRET}`).toString('base64');

	return await OAuth.revokeToken(token, credentials);
}

/**
 * Retrieves user information from Discord's API
 * @param {string} token
 * @returns {Promise<OAuth.User>}
 */
export async function getUser(token) {
	return await OAuth.getUser(token);
}

/**
 * Adds user to the Discord guild specified as guildId
 * @param {string} token
 * @param {object} user
 * @returns {Promise<OAuth.Member>}
 */
export async function joinGuild(token, user) {
	const { id } = user;

	return await OAuth.addMember({
		accessToken: token,
		botToken: process.env.DISCORD_BOT_TOKEN,
		guildId: '884033801334980649',
		userId: id,
	});
}