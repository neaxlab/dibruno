import { configSchema } from "./schemas";

const defineConfig = {
  shopifyShop: import.meta.env.PUBLIC_SHOPIFY_SHOP || "dibruno.myshopify.com",
  publicShopifyAccessToken: import.meta.env
    .PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || "shpat_1234567890abcdef",
  privateShopifyAccessToken: import.meta.env
    .PRIVATE_SHOPIFY_STOREFRONT_ACCESS_TOKEN
    ? import.meta.env.PRIVATE_SHOPIFY_STOREFRONT_ACCESS_TOKEN
    : "shpat_1234567890abcdef",
  apiVersion: "2025-07",
};

export const config = configSchema.parse(defineConfig);
