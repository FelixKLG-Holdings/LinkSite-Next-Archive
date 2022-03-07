import Script from "next/script";

const analytics_id = process.env.NEXT_PUBLIC_UMAMI_ID;
const analytics_web = process.env.NEXT_PUBLIC_UMAMI_URL;

export default function Analytics() {
    if (analytics_id && analytics_web) {
        return <Script src={analytics_web} data-website-id={analytics_id}/>
    } else {
        return <></>;
    }
}