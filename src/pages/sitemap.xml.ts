import type { APIRoute } from 'astro';
import { getProducts } from '@/utils/shopify';

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
        changefreq: 'weekly',
        priority: 1.0
      },
      {
        url: '/about',
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.8
      },
      {
        url: '/shop',
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.9
      },
      {
        url: '/ingredients',
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        url: '/testimonials',
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.6
      },
      {
        url: '/faqs',
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: 0.6
      }
    ];

    // URLs dinámicas de productos
    const productUrls = products
      .filter(product => product && product.handle)
      .map(product => ({
        url: `/shop/${product.handle}`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.8
      }));

    // Combinar todas las URLs
    const allUrls = [...staticUrls, ...productUrls];

    // Generar XML del sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(url => `  <url>
    <loc>https://dibrunolab.com${url.url}</loc>
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
