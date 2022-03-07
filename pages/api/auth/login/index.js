import { getOpenIDLink } from '/lib/auth/user/SteamOpenId';

/**
 *
 * @param {object} req
 * @param {object} res
 * @returns {Promise<void>}
 */
export default async function login(req, res) {
	res.redirect(307, await getOpenIDLink());
}