import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

/**
 * StructuredData Component - Adds JSON-LD structured data for search engines
 * Helps Google and other search engines understand the content and context
 */
function StructuredData({ type = 'Organization' }) {
  const baseURL = 'https://jeffbai996.github.io';

  // Organization Schema - Main government portal
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'GovernmentOrganization',
    'name': 'Republic of Praya Government',
    'alternateName': 'GOV.PRAYA',
    'url': baseURL,
    'logo': `${baseURL}/icon-512.svg`,
    'description': 'Official government portal for the Republic of Praya providing access to all government services, departments, and information.',
    'contactPoint': {
      '@type': 'ContactPoint',
      'contactType': 'customer service',
      'availableLanguage': ['English'],
    },
    'sameAs': [],
    'address': {
      '@type': 'PostalAddress',
      'addressCountry': 'Praya',
      'addressRegion': 'Republic of Praya',
    },
    'areaServed': {
      '@type': 'Country',
      'name': 'Republic of Praya',
    },
  };

  // Website Schema - For the portal itself
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'GOV.PRAYA',
    'url': baseURL,
    'description': 'Official government portal of the Republic of Praya',
    'publisher': {
      '@type': 'GovernmentOrganization',
      'name': 'Republic of Praya Government',
    },
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': `${baseURL}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  // Government Service Schema - For department pages
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'GovernmentService',
    'serviceType': 'Government Portal Services',
    'provider': {
      '@type': 'GovernmentOrganization',
      'name': 'Republic of Praya Government',
    },
    'areaServed': {
      '@type': 'Country',
      'name': 'Republic of Praya',
    },
    'availableChannel': {
      '@type': 'ServiceChannel',
      'serviceUrl': baseURL,
      'serviceType': 'Online Portal',
    },
  };

  // Breadcrumb Schema - For navigation
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': baseURL,
      },
    ],
  };

  // Select appropriate schema based on type
  let schema;
  switch (type) {
    case 'Organization':
      schema = [organizationSchema, websiteSchema];
      break;
    case 'Service':
      schema = serviceSchema;
      break;
    case 'Breadcrumb':
      schema = breadcrumbSchema;
      break;
    default:
      schema = organizationSchema;
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

StructuredData.propTypes = {
  type: PropTypes.oneOf(['Organization', 'Service', 'Breadcrumb']),
};

export default StructuredData;
