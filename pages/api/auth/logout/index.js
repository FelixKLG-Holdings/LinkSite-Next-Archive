import { withSessionRoute } from 'lib/auth/user/withSession';

export default withSessionRoute(user);

async function user(req, res) {
	await req.session.destroy();
	await res.status(200).send('logged out');
}