import { getOpenIDLink} from "/lib/SteamOpenId";

export default async function login(req, res) {
    res.redirect(307, await getOpenIDLink())
}