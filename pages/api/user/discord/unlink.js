import { getDiscordToken, removeDiscord } from '/lib/user/Discord/database';
import { revokeToken } from '/lib/user/Discord/actions';
import { withSessionRoute } from '/lib/auth/withSession';

export default withSessionRoute(unlink);

async function unlink(req, res) {
	const token = await getDiscordToken(req.session.account);
	await revokeToken(token);
	await removeDiscord(req.session.account);
	res.status(200).send('done');
}