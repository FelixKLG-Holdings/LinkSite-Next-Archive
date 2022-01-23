import {OpenIDValidate} from "lib/auth/SteamOpenId";
import {withSessionRoute} from "lib/auth/withSession.js";


export default async function callback(req, res) {
    try {
        const SteamUser = await OpenIDValidate(req);

        res.status(200).json(SteamUser)
    } catch (e) {
        console.log(e)
    }
}


// export default withSessionRoute(loginRoute);
//
// async function loginRoute(req, res) {
//
//
//
//
//     req.session.user = {
//         id: 230,
//         admin: true,
//     };
//     await req.session.save();
//     res.end(200);
// }

