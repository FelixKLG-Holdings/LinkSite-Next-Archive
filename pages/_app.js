import '../styles/globals.css'
import {SessionProvider} from "next-auth/react";
import HeadTags from "../components/HeadTags";
import LoadFonts from "../components/fonts";

function MyApp({Component, pageProps: {session, ...pageProps}}) {
    return (
        <SessionProvider session={session} refetchInterval={5 * 60}>
            <HeadTags/>
            <LoadFonts/>
            <Component {...pageProps} />
        </SessionProvider>
    )
}

export default MyApp