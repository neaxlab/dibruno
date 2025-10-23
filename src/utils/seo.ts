// Configuración SEO y optimización para DiBruno Lab
export const seoConfig = {
  // Información del sitio
  site: {
    name: 'DiBruno Lab',
    url: 'https://dibrunolab.com',
    description: 'Productos veganos y orgánicos para el cuidado del cabello',
    logo: '/images/home/logo.svg',
    twitterHandle: '@DiBrunoLab',
    facebookAppId: '25194880230109237'
  },

  // Configuración de imágenes
  images: {
    defaultOgImage: '/images/home/DiBrunoLab-OG.png',
    defaultTwitterImage: '/images/home/DiBrunoLab-TW.png',
    defaultFavicon: '/favicon.svg',
    // Configuración para optimización de imágenes
    optimization: {
      quality: 85,
      format: 'webp',
      fallbackFormat: 'jpg',
      sizes: [320, 640, 768, 1024, 1280, 1920],
      placeholder: 'blur'
    }
  },

  // Configuración de meta tags por defecto
  defaultMeta: {
    robots: 'index, follow',
    author: 'DiBruno Lab',
    keywords: [
      'cabello',
      'cuidado capilar',
      'vegano',
      'orgánico',
      'anti-caída',
      'crecimiento capilar',
      'DiBruno Lab',
      'productos naturales',
      'cruelty-free',
      'sin sulfatos'
    ].join(', '),
    themeColor: '#000000',
    viewport: 'width=device-width, initial-scale=1.0'
  },

  // Configuración de datos estructurados
  structuredData: {
    organization: {
      '@type': 'Organization',
      name: 'DiBruno Lab',
      url: 'https://dibrunolab.com',
      logo: 'https://dibrunolab.com/images/home/logo.svg',
      description: 'Productos veganos y orgánicos para el cuidado del cabello',
      sameAs: [
        'https://www.instagram.com/dibrunolab',
        'https://www.facebook.com/dibrunolab',
        'https://twitter.com/dibrunolab'
      ]
    },
    website: {
      '@type': 'WebSite',
      name: 'DiBruno Lab',
      url: 'https://dibrunolab.com',
      description: 'Productos veganos y orgánicos para el cuidado del cabello',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://dibrunolab.com/shop?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    }
  },

  // Configuración de sitemap
  sitemap: {
    changefreq: {
      home: 'weekly',
      products: 'weekly',
      static: 'monthly'
    },
    priority: {
      home: 1.0,
      products: 0.8,
      static: 0.6
    }
  },

  // Configuración de caché
  cache: {
    sitemap: 3600, // 1 hora
    products: 1800, // 30 minutos
    static: 86400 // 24 horas
  }
};

// Función para generar URLs canónicas
export function generateCanonicalUrl(path: string): string {
  return `${seoConfig.site.url}${path}`;
}

// Función para generar meta tags de producto
export function generateProductMeta(product: any) {
  const title = product.seo?.title || product.title;
  const description = product.seo?.description || product.description || `Descubre ${product.title} - Producto vegano y orgánico de DiBruno Lab para el cuidado del cabello.`;
  const image = product.featuredImage?.url || product.images?.nodes?.[0]?.url || seoConfig.images.defaultOgImage;
  const price = product.variants?.nodes?.[0]?.price?.amount || '0';
  const currency = product.variants?.nodes?.[0]?.price?.currencyCode || 'USD';
  const availability = product.variants?.nodes?.[0]?.availableForSale ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock';

  return {
    title,
    description,
    image,
    price,
    currency,
    availability,
    url: generateCanonicalUrl(`/shop/${product.handle}`)
  };
}

// Función para generar datos estructurados de producto
export function generateProductSchema(product: any, meta: any) {
  return {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.title,
    image: product.images?.nodes?.map((img: any) => img?.url).filter(Boolean) || [meta.image],
    description: product.description,
    sku: product.variants?.nodes?.[0]?.id || product.id,
    brand: {
      '@type': 'Brand',
      name: 'DiBruno Lab'
    },
    offers: {
      '@type': 'Offer',
      url: meta.url,
      priceCurrency: meta.currency,
      price: meta.price,
      availability: meta.availability,
      seller: {
        '@type': 'Organization',
        name: 'DiBruno Lab'
      }
    },
    category: 'Hair Care',
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Vegan',
        value: 'Yes'
      },
      {
        '@type': 'PropertyValue',
        name: 'Organic',
        value: 'Yes'
      },
      {
        '@type': 'PropertyValue',
        name: 'Cruelty-Free',
        value: 'Yes'
      }
    ]
  };
}
