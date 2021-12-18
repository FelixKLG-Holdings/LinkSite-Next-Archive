import Script from "next/script";
import styles from '../styles/fonts.module.css';


export default function LoadFonts() {
    return <>
        <Script src={"/js/TypeKit.js"} strategy={"afterInteractive"}/>
    </>
}