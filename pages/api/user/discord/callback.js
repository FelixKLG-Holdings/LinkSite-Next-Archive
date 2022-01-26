import { getOAuthToken } from 'lib/user/Discord/actions';
import { withSessionRoute } from 'lib/auth/withSession';

export default withSessionRoute(callback);

async function callback(req, res) {
	res.status(200).json(await getOAuthToken(req.query.code, req.session.account));
}