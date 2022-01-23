import { withSessionRoute } from "lib/auth/withSession";

export default withSessionRoute(user)

async function user(req, res) {
    res.send({account: req.session.account});
}