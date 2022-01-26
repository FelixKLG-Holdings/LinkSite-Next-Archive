import { OpenIDValidate } from 'lib/auth/SteamOpenId';
import { withSessionRoute } from 'lib/auth/withSession.js';
import { userAccount } from '/lib/user/userLogin';


export default withSessionRoute(loginRoute);

async function loginRoute(req, res) {

	const SteamUser = await OpenIDValidate(req, res);

	const Account = await userAccount(SteamUser.steamid, SteamUser.username, SteamUser.avatar.medium);

	req.session.account = {
		id: await Account.id,
		steamId: await Account.steamId,
		user: {
			name: await Account.user.name,
			blocked: await Account.user.blocked,
			avatar: await Account.user.image,
			role: await Account.user.role,
		},
	};
	await req.session.save();
	await res.send('done');
}