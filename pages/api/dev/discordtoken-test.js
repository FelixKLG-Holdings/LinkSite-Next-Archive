import { withSessionRoute } from '/lib/auth/user/withSession';
import { getDiscordToken } from 'lib/auth/Discord/database';

export default withSessionRoute(test);

async function test(req, res) {
	const token = await getDiscordToken(req.session.account);
	res.status(200).json({ token });
}