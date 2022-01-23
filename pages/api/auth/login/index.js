import { getOpenIDLink} from "/lib/auth/SteamOpenId";

export default async function login(req, res) {
    res.redirect(307, await getOpenIDLink())
}