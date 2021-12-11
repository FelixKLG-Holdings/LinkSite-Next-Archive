import NextHead from 'next/head'
import {string} from 'prop-types'

const defaultDescription = "Create a ticket.";
const defaultOGURL = 'https://leystryku.support/'
const defaultOGImage = 'https://leystryku.support/assets/'

const HeadTags = (props) => (
        <NextHead>
            <meta charSet="UTF-8"/>
            <title>Leystryku Support</title>
            <title>FelixKLG | {props.title || 'Website'}</title>
            <meta name="description" content={props.description || defaultDescription}/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="icon" href="/favicon.ico"/>
            <meta property="og:url" content={props.url || defaultOGURL}/>
            <meta property="og:title" content={props.title || 'Leystryku Support'}/>
            <meta property="og:description" content={props.description || defaultDescription}/>
            <meta property="og:image" content={props.ogImage || defaultOGImage}/>
            <meta property="og:image:width" content="128"/>
            <meta property="og:image:height" content="128"/>
        </NextHead>
    )

HeadTags.propTypes = {
    title: string,
    description: string,
    url: string,
    ogImage: string
}

export default HeadTags