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
  key: z.string(),
  value: z.string(),
  reference: z.object({
    image: ImageResult,
  }).nullable().optional(),
});

export const MetaobjectResult = z.object({
  fields: z.array(MetaobjectFieldResult),
});

export const MetafieldMetaobjectResult = z.object({
  id: z.string(),
  namespace: z.string(),
  key: z.string(),
  value: z.string(),
  type: z.string(),
  reference: z.object({
    id: z.string(),
    handle: z.string(),
    fields: z.array(MetaobjectFieldResult),
  }).nullable().optional(),
}).nullable().optional().transform((data) => {
  if (!data || !data.reference?.fields) return data;
  
  // Transformar los campos del metaobject en un formato más fácil de usar
  const fields = data.reference.fields.reduce((acc, field) => {
    acc[field.key] = field.value;
    // Si el campo tiene una referencia de imagen, la agregamos
    if (field.reference?.image) {
      acc[`${field.key}_image`] = field.reference.image;
    }
    // Si el campo tiene una referencia a otro metaobject (como los pasos)
    if (field.reference && !field.reference.image) {
      acc[`${field.key}_metaobject`] = field.reference;
    }
    return acc;
  }, {} as Record<string, any>);
  
  // Procesar los pasos desde step_2 si existe
  let steps: Array<{
    id: string;
    handle: string;
    title: string;
    description: string;
    step_number: number;
    [key: string]: any;
  }> = [];
  
  // Debug: Log fields to see what's available
  console.log('MetafieldMetaobjectResult - fields:', fields);
  
  // Buscar el campo step_2 en los campos del metaobject
  const step2Field = fields.step_2;
  console.log('MetafieldMetaobjectResult - step2Field:', step2Field);
  
  // También buscar otros posibles campos de pasos
  const stepsField = fields.steps || fields.step || fields.step_list || fields.step_list_2;
  console.log('MetafieldMetaobjectResult - stepsField:', stepsField);
  
  // Buscar cualquier campo que contenga "step" en el nombre
  const stepFields = Object.keys(fields).filter(key => key.toLowerCase().includes('step'));
  console.log('MetafieldMetaobjectResult - stepFields:', stepFields);
  
  if (step2Field) {
    try {
      // step_2 debería contener un JSON string con los IDs de los metaobjects
      const stepIds = JSON.parse(step2Field);
      if (Array.isArray(stepIds)) {
        // Crear pasos básicos con los IDs (se procesarán después)
        steps = stepIds.map((stepId, index) => ({
          id: stepId,
          handle: `step-${index + 1}`,
          title: `Step ${index + 1}`,
          description: `Step ${index + 1} description`,
          step_number: index + 1,
        }));
      }
    } catch (error) {
      console.warn('Error parsing step_2:', error);
    }
  } else if (stepsField) {
    try {
      // Intentar parsear otros campos de pasos
      const stepIds = JSON.parse(stepsField);
      if (Array.isArray(stepIds)) {
        steps = stepIds.map((stepId, index) => ({
          id: stepId,
          handle: `step-${index + 1}`,
          title: `Step ${index + 1}`,
          description: `Step ${index + 1} description`,
          step_number: index + 1,
        }));
      }
    } catch (error) {
      console.warn('Error parsing steps field:', error);
    }
  } else if (stepFields.length > 0) {
    // Buscar en todos los campos que contengan "step"
    for (const fieldName of stepFields) {
      try {
        const fieldValue = fields[fieldName];
        console.log(`Intentando parsear campo ${fieldName}:`, fieldValue);
        
        if (fieldValue && typeof fieldValue === 'string') {
          const stepIds = JSON.parse(fieldValue);
          if (Array.isArray(stepIds)) {
            steps = stepIds.map((stepId, index) => ({
              id: stepId,
              handle: `step-${index + 1}`,
              title: `Step ${index + 1}`,
              description: `Step ${index + 1} description`,
              step_number: index + 1,
            }));
            console.log(`✅ Pasos encontrados en campo ${fieldName}`);
            break; // Salir del bucle si encontramos pasos
          }
        }
      } catch (error) {
        console.warn(`Error parsing field ${fieldName}:`, error);
      }
    }
  }
  
  console.log('MetafieldMetaobjectResult - final steps:', steps);
  
  return {
    ...data,
    fields,
    content: fields.content || fields.description || fields.text || '',
    image: fields.image_image || null,
    steps: steps,
  };
});

// Esquema específico para FAQs
export const FAQMetaobjectResult = MetafieldMetaobjectResult.transform((data) => {
  if (!data || !(data as any).fields?.faq) return data;
  
  // Procesar el campo 'faq' que contiene una lista de IDs de metaobjects
  let faqs: Array<{
    id: string;
    handle: string;
    question: string;
    answer: string;
  }> = [];
  
  try {
    const faqIds = JSON.parse((data as any).fields.faq);
    if (Array.isArray(faqIds)) {
      // Crear FAQs básicos con los IDs (se procesarán después con getFAQContent)
      faqs = faqIds.map((faqId, index) => ({
        id: faqId,
        handle: `faq-${index + 1}`,
        question: `Pregunta ${index + 1}`,
        answer: `Respuesta ${index + 1}`,
      }));
    }
  } catch (error) {
    console.warn('Error parsing faq field:', error);
  }
  
  return {
    ...data,
    faqIds: faqs.map(faq => faq.id),
    faqs: faqs,
  };
});

export const AboutMetaobjectResult = MetafieldMetaobjectResult
  .nullable()
  .transform((data) => {
    if (!data) return null;
    const description = (data as any).fields?.description || (data as any).content || '';
    const image = (data as any).image || null;
    return { description, image } as { description: string; image: typeof ImageResult._type | null };
  });

export const MetafieldListMetaobjectResult = z.object({
  value: z.string(),
  type: z.string(),
  references: z.object({
    edges: z.array(z.object({
      node: z.object({
        id: z.string(),
        handle: z.string(),
        fields: z.array(MetaobjectFieldResult),
      }),
    })),
  }).nullable().optional(),
}).nullable().optional().transform((data) => {
  if (!data || !data.references?.edges) return data;
  
  // Transformar los metaobjects en un formato más fácil de usar
  const ingredients = data.references.edges.map(edge => {
    const node = edge.node;
    const fields = node.fields.reduce((acc, field) => {
      acc[field.key] = field.value;
      // Si el campo tiene una referencia de imagen, la agregamos
      if (field.reference?.image) {
        acc[`${field.key}_image`] = field.reference.image;
      }
      return acc;
    }, {} as Record<string, any>);
    
    // Buscar la imagen del campo 'image'
    const imageField = node.fields.find(field => field.key === 'image');
    const image = imageField?.reference?.image || null;
    
    return {
      id: node.id,
      handle: node.handle,
      title: fields.title || fields.name || '',
      description: fields.description || '',
      url: image?.url || '',
      altText: image?.altText || '',
      image: image,
    };
  });
  
  return {
    ...data,
    ingredients,
  };
});

export const ProductResult = z
  .object({
    id: z.string(),
    title: z.string(),
    handle: z.string(),
    description: z.string().nullable().optional(),
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
    activeIngredients: MetafieldListMetaobjectResult.nullable(),
    benefits: MetafieldResult.nullable(),
    faq_s: FAQMetaobjectResult.nullable(),
    about: AboutMetaobjectResult,
    howToUse: MetafieldMetaobjectResult.nullable(),
    treatment: MetafieldListMetaobjectResult.nullable(),
  })
  .nullable();

export const CollectionResult = z.object({
  // id: z.string(),
  title: z.string(),
  handle: z.string(),
  // description: z.string().nullable().optional(),
  // image: ImageResult.nullable(),
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
