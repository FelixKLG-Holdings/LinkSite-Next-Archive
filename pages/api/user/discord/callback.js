import { getToken, getUser } from '/lib/user/Discord/actions';
import { updateDiscordInfo, addDiscordId, setDiscordToken, getDiscordToken } from '/lib/user/Discord/database';
import { withSessionRoute } from '/lib/auth/withSession';

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
	const { id } = session;
	const token = await getDiscordToken(session);

	const discordUser = await getUser(token);

	await addDiscordId(session, discordUser);

}