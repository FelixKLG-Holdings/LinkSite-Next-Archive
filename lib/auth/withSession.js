import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next';

export const sessionOptions = {
	cookieName: 'leysup_session',
	password: process.env.IRON_PASWORD,
	cookieOptions: {
		secure: process.env.NODE_ENV === 'production',
	},
};

export function withSessionRoute(handler) {
	return withIronSessionApiRoute(handler, sessionOptions);
}

export function withSessionSsr(handler) {
	return withIronSessionSsr(handler, sessionOptions);
}