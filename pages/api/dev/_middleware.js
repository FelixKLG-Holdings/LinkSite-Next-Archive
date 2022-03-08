import { NextResponse } from 'next/server';

export default async function _middleware(req) {
	if (process.env.NODE_ENV !== 'development') {
		return NextResponse.rewrite(new URL('/404', req.url));
	}
}