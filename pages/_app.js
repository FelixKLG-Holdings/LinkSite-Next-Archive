import '../styles/globals.css'
import HeadTags from "../components/HeadTags";
import LoadFonts from "../components/fonts";

function MyApp({ Component, pageProps }) {
    return (
        <HeadTags/>
        <LoadFonts />
        <Component {...pageProps} />
    )
}

export default MyApp