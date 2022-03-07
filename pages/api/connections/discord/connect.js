export default async function oauth(req, res) {
    res.redirect(307, process.env.DSICORD_OAUTH_URL);
}