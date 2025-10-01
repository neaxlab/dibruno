import { z } from "zod";

export const configSchema = z.object({
  shopifyShop: z.string(),
  publicShopifyAccessToken: z.string(),
  privateShopifyAccessToken: z.string(),
  apiVersion: z.string(),
});

export const MoneyV2Result = z.object({
  amount: z.string(),
  currencyCode: z.string(),
});

export const ImageResult = z
  .object({
    altText: z.string().nullable().optional(),
    url: z.string(),
    width: z.number().positive().int().optional(),
    height: z.number().positive().int().optional(),
  })
  .nullable();

export const CartItemResult = z.object({
  id: z.string(),
  cost: z.object({
    amountPerQuantity: MoneyV2Result,
    subtotalAmount: MoneyV2Result,
    totalAmount: MoneyV2Result,
  }),
  merchandise: z.object({
    id: z.string(),
    title: z.string(),
    product: z.object({
      title: z.string(),
      handle: z.string(),
    }),
    image: ImageResult.nullable(),
  }),
  quantity: z.number().positive().int(),
});

export const CartResult = z
  .object({
    id: z.string(),
    cost: z.object({
      subtotalAmount: MoneyV2Result,
    }),
    checkoutUrl: z.string(),
    totalQuantity: z.number().int(),
    lines: z.object({
      nodes: z.array(CartItemResult),
    }),
  })
  .nullable();

export const VariantResult = z.object({
  id: z.string(),
  title: z.string(),
  availableForSale: z.boolean(),
  price: MoneyV2Result,
  compareAtPrice: z.object({
    amount: z.string(),
  }).nullable(),
});

export const MetafieldResult = z.object({
  value: z.string(),
  type: z.string(),
}).nullable().optional();

export const MetafieldFileResult = z.object({
  value: z.string(),
  type: z.string(),
  reference: z.object({
    image: ImageResult,
  }).nullable().optional(),
}).nullable().optional();

export const MetaobjectFieldResult = z.object({
  reference: z.object({
    image: ImageResult,
  }).nullable().optional(),
});

export const MetaobjectResult = z.object({
  fields: z.array(MetaobjectFieldResult),
});

export const MetafieldListMetaobjectResult = z.object({
  value: z.string(),
  type: z.string(),
  references: z.object({
    nodes: z.array(MetaobjectResult),
  }).nullable().optional(),
}).nullable().optional().transform((data) => {
  if (!data || !data.references?.nodes) return data;
  
  // Extraer todas las imágenes de los campos
  const images = data.references.nodes
    .flatMap(node => node.fields)
    .map(field => field.reference?.image)
    .filter((img): img is NonNullable<typeof img> => img !== null && img !== undefined);
  
  return {
    ...data,
    images,
  };
});

export const ProductResult = z
  .object({
    id: z.string(),
    title: z.string(),
    handle: z.string(),
    description: z.string().nullable().optional(),
    dimensions: MetafieldResult,
    materials: MetafieldResult,
    product_care: MetafieldResult,
    images: z.object({
      nodes: z.array(ImageResult),
    }),
    variants: z.object({
      nodes: z.array(VariantResult),
    }),
    featuredImage: ImageResult.nullable(),
    collections: z.object({
      edges: z.array(z.object({
        node: z.object({
          id: z.string(),
          title: z.string(),
          handle: z.string(),
        }),
      })),
    }),
    active_ingredients: MetafieldListMetaobjectResult.nullable(),
    how_to_use: MetafieldResult.nullable(),
    faqs: MetafieldResult.nullable(),
    full_description: MetafieldResult.nullable(),
    full_image: MetafieldFileResult.nullable().transform((data) => {
      if (!data || !data.reference?.image) return data;
      return data.reference.image;
    }),
  })
  .nullable();

export const CollectionResult = z.object({
  id: z.string(),
  title: z.string(),
  handle: z.string(),
  description: z.string().nullable().optional(),
  image: ImageResult.nullable(),
});

export const CollectionProductResult = z.object({
  id: z.string(),
  title: z.string(),
  handle: z.string(),
  priceRange: z.object({
    minVariantPrice: MoneyV2Result,
  }),
  images: z.object({
    edges: z.array(z.object({
      node: ImageResult,
    })),
  }),
  variants: z.object({
    nodes: z.array(VariantResult),
  }),
  featuredImage: ImageResult.nullable(),
});

export const CollectionWithProductsResult = z.object({
  title: z.string(),
  description: z.string().nullable().optional(),
  descriptionHtml: z.string().nullable().optional(),
  products: z.object({
    edges: z.array(z.object({
      node: CollectionProductResult,
    })),
  }),
});
