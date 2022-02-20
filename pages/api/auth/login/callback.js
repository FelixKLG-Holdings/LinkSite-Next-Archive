import { OpenIDValidate } from 'lib/auth/SteamOpenId';
import { withSessionRoute } from 'lib/auth/withSession.js';
import { userAccount } from 'lib/user/userAccount';


export default withSessionRoute(loginRoute);


/**
 *
 * @param {object} req
 * @param {object} res
 * @returns {Promise<void>}
 */
async function loginRoute(req, res) {

	const SteamUser = await OpenIDValidate(req, res);

	const Account = await userAccount(SteamUser);
	req.session.account = {
		id: Account.id,
		steamId: Account.steamId.toString(),
		user: {
			name: Account.user.name,
			blocked: Account.user.blocked,
			avatar: Account.user.image,
			role: Account.user.role,
		},
	};
	await req.session.save();
	await res.send('done');
}