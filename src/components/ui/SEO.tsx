import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    path?: string;
    image?: string;
}

const SITE_NAME = "Dee's AI Life Lab";
const BASE_URL = 'https://dee-website.vercel.app';
const DEFAULT_DESC = '將繁瑣交給 AI，把時間留給生活。不教你 1000 個工具，只幫你找到最適合你的那一個。';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;

const SEO = ({ title, description = DEFAULT_DESC, path = '/', image = DEFAULT_IMAGE }: SEOProps) => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    const url = `${BASE_URL}${path}`;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    );
};

export default SEO;
