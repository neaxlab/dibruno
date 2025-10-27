import type { APIRoute } from 'astro';
import { getProducts } from '@/utils/shopify';
import { generateCanonicalUrl, seoConfig } from '@/utils/seo';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  try {
    // Obtener IP del cliente de forma segura
    let ip = null;
    try {
      const headers = request.headers;
      ip = headers.get("x-vercel-forwarded-for") || headers.get("x-forwarded-for") || "127.0.0.1";
    } catch (error) {
      ip = "127.0.0.1";
    }

    // Obtener todos los productos
    const products = await getProducts({ limit: 250, buyerIP: ip });
    
    // URLs estáticas del sitio
    const staticUrls = [
      {
        url: '/',
        lastmod: new Date().toISOString(),
        changefreq: seoConfig.sitemap.changefreq.home,
        priority: seoConfig.sitemap.priority.home
      },
      {
        url: '/about',
        lastmod: new Date().toISOString(),
        changefreq: seoConfig.sitemap.changefreq.static,
        priority: seoConfig.sitemap.priority.static
      },
      {
        url: '/products',
        lastmod: new Date().toISOString(),
        changefreq: seoConfig.sitemap.changefreq.products,
        priority: seoConfig.sitemap.priority.products
      },
      {
        url: '/ingredients',
        lastmod: new Date().toISOString(),
        changefreq: seoConfig.sitemap.changefreq.static,
        priority: seoConfig.sitemap.priority.static
      },
      {
        url: '/testimonials',
        lastmod: new Date().toISOString(),
        changefreq: seoConfig.sitemap.changefreq.static,
        priority: seoConfig.sitemap.priority.static
      },
      {
        url: '/faqs',
        lastmod: new Date().toISOString(),
        changefreq: seoConfig.sitemap.changefreq.static,
        priority: seoConfig.sitemap.priority.static
      },
      {
        url: '/policy/privacy-policy',
        lastmod: new Date().toISOString(),
        changefreq: 'yearly',
        priority: 0.4
      },
      {
        url: '/policy/refund-policy',
        lastmod: new Date().toISOString(),
        changefreq: 'yearly',
        priority: 0.4
      },
      {
        url: '/policy/shipping-policy',
        lastmod: new Date().toISOString(),
        changefreq: 'yearly',
        priority: 0.4
      },
      {
        url: '/policy/terms-of-service',
        lastmod: new Date().toISOString(),
        changefreq: 'yearly',
        priority: 0.4
      },
      {
        url: '/policy/subscription-policy',
        lastmod: new Date().toISOString(),
        changefreq: 'yearly',
        priority: 0.4
      }
    ];

    // URLs dinámicas de productos
    const productUrls = products
      .filter((product): product is typeof product & { handle: string } => product !== null && !!product.handle)
      .map(product => ({
        url: `/products/${product.handle}`,
        lastmod: new Date().toISOString(),
        changefreq: seoConfig.sitemap.changefreq.products,
        priority: seoConfig.sitemap.priority.products
      }));

    // Combinar todas las URLs
    const allUrls = [...staticUrls, ...productUrls];

    // Generar XML del sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(url => `  <url>
    <loc>${generateCanonicalUrl(url.url)}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600' // Cache por 1 hora
      }
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
};
