import Link from 'next/link';

export default function index() {
	return (
		<div className={'bg-slate-700 h-screen text-gray-100 text-center text-9xl'}>
			<Link href={'/api/auth/login'}>
                    click here to log in!
			</Link>
		</div>
	);
}