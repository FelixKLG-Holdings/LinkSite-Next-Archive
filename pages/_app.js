import 'styles/globals.css';

import { Fragment } from 'react';
import Heads from '/components/misc/head';
import Analytics from '/components/misc/analytics';

function MyApp({ Component, pageProps }) {
	return (
		<Fragment>
			<Heads />
			<Analytics />
			<Component {...pageProps} />
		</Fragment>
	);
}

export default MyApp;