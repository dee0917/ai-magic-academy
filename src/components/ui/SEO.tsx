import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    path?: string;
    image?: string;
}

const SITE_NAME = "Dee's AI Life Lab";
const BASE_URL = 'https://dee-website.vercel.app';
const DEFAULT_DESC = '不教你 1000 個工具，只幫你找到最適合你的那一個。用最白話的方式學 AI，小孩到長輩都能懂。';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.svg`;

const SEO = ({ title, description, path = '', image }: SEOProps) => {
    const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    const pageDesc = description || DEFAULT_DESC;
    const url = `${BASE_URL}${path}`;
    const ogImage = image || DEFAULT_OG_IMAGE;

    return (
        <Helmet>
            <title>{pageTitle}</title>
            <meta name="description" content={pageDesc} />
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={pageDesc} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:locale" content="zh_TW" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:description" content={pageDesc} />
            <meta name="twitter:image" content={ogImage} />
            <link rel="canonical" href={url} />
        </Helmet>
    );
};

export default SEO;
