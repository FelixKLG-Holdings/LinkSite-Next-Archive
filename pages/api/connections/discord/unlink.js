import { getDiscord, getDiscordToken, removeDiscord } from '/lib/auth/discord/database';
import { revokeToken } from '/lib/auth/discord/actions';
import { withSessionRoute } from '/lib/auth/user/withSession';

export default withSessionRoute(unlink);

async function unlink(req, res) {

	if (!await getDiscord(req.session.account).discord) {
		res.status(403).json({ error: 'You have no linked Discord account.' });
		return;
	}

	const token = await getDiscordToken(req.session.account);
	await revokeToken(token);
	await removeDiscord(req.session.account);
	res.status(200).send('done');
}