import { Helmet } from 'react-helmet-async';
import { getSEOConfig, defaultSEO } from '../config/seoConfig';

/**
 * SEO Component - Manages meta tags for search engines and social media
 * Uses react-helmet-async for dynamic head management in React
 */
function SEO({ path, customTitle, customDescription, customImage, customKeywords }) {
  // Get SEO config for the current path, or use defaults
  const config = path ? getSEOConfig(path) : defaultSEO;

  // Allow custom overrides
  const title = customTitle || config.title;
  const description = customDescription || config.description;
  const image = customImage || config.image;
  const keywords = customKeywords || config.keywords;
  const url = config.url;
  const siteName = config.siteName;
  const ogType = config.ogType || 'website';
  const noIndex = config.noIndex || false;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Robots meta tag - prevent indexing of auth pages */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Open Graph Tags for Social Media (Facebook, LinkedIn) */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={`${siteName} - Government Portal`} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={`${siteName} - Government Portal`} />

      {/* Additional SEO Tags */}
      <meta name="author" content="Republic of Praya Government" />
      <meta name="language" content="English" />
      <meta name="geo.region" content="Praya" />
      <meta name="geo.placename" content="Republic of Praya" />

      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="format-detection" content="telephone=no" />
    </Helmet>
  );
}

export default SEO;
