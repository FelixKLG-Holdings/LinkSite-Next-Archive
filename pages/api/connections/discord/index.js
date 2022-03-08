import { getDiscord } from '/lib/auth/Discord/database';
import {withSessionRoute} from "/lib/auth/user/withSession";

export default withSessionRoute(getDiscordAccount);

async function getDiscordAccount(req, res) {

	const discordAccount = await getDiscord(req.session.account);

	if (!discordAccount.discord) {
		res.status(404).json({error: 'You have no linked Discord account.'});
		return;
	}

	const json = JSON.stringify(discordAccount, (key, value) =>
		typeof value === "bigint" ? value.toString() : value
	);

	res.status(200).json(JSON.parse(json))
}