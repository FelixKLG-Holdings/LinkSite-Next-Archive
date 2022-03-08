import { getToken, getUser } from '/lib/auth/discord/actions';
import { addDiscordInfo, setDiscordToken, getDiscordToken } from '/lib/auth/discord/database';
import { withSessionRoute } from '/lib/auth/user/withSession';

export default withSessionRoute(callback);

/**
 * Handle the response from Discord OAuth
 * @param {object} req
 * @param {object} res
 * @returns {Promise<void>}
 */
async function callback(req, res) {
	const tokens = await getToken(req.query.code);

	await setDiscordToken(req.session.account, tokens);

	await updateDatabaseInfo(req.session.account);

	await res.status(200).send('done');
}

/**
 * Update the database to show the user's Discord information
 * @param session
 * @returns {Promise<void>}
 */
async function updateDatabaseInfo(session) {
	const token = await getDiscordToken(session);

	const discordUser = await getUser(token);

	await addDiscordInfo(session, discordUser);

}