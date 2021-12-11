import '../styles/globals.css'
import { SessionProvider } from "next-auth/react";
import HeadTags from "../components/UI/HeadTags";

function MyApp({ Component, pageProps: { session, ...pageProps} }) {
  return (
      <SessionProvider session={session} refetchInterval={5 * 60}>
          <HeadTags/>
          <Component {...pageProps} />
      </SessionProvider>
  )
}

export default MyApp