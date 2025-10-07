import { z } from "zod";
import { CartResult, ProductResult, CollectionResult, CollectionWithProductsResult } from "./schemas";
import { config } from "./config";
import {
  ProductsQuery,
  ProductByHandleQuery,
  CreateCartMutation,
  AddCartLinesMutation,
  GetCartQuery,
  RemoveCartLinesMutation,
  UpdateCartLinesMutation,
  ProductRecommendationsQuery,
  CollectionsQuery,
  CollectionProductsQuery,
  StepMetaobjectQuery,
  ProductsByQuery,
} from "./graphql";

// Make a request to Shopify's GraphQL API  and return the data object from the response body as JSON data.
const makeShopifyRequest = async (
  query: string,
  variables: Record<string, unknown> = {},
  buyerIP: string = ""
) => {
  const isSSR = import.meta.env.SSR;
  const apiUrl = `https://${config.shopifyShop}/api/${config.apiVersion}/graphql.json`;

  function getOptions() {
    // If the request is made from the server, we need to pass the private access token and the buyer IP
    isSSR &&
      !buyerIP &&
      (() => {
        throw new Error(
          `🔴 No buyer IP provided => make sure to pass the buyer IP when making a server side Shopify request.`
        );
      })();

    const { privateShopifyAccessToken, publicShopifyAccessToken } = config;
    
    
    const options = {
      method: "POST",
      headers: {},
      body: JSON.stringify({ query, variables }),
    };
    // Check if the Shopify request is made from the server or the client
    if (isSSR) {
      options.headers = {
        "Content-Type": "application/json",
        "Shopify-Storefront-Private-Token": privateShopifyAccessToken,
        "Shopify-Storefront-Buyer-IP": buyerIP,
      };
      return options;
    }
    options.headers = {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": publicShopifyAccessToken,
    };

    return options;
  }

  const requestOptions = getOptions();
  
  const response = await fetch(apiUrl, requestOptions);

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`${response.status} ${body}`);
  }

  const json = await response.json();
  
  if (json.errors) {
    throw new Error(json.errors.map((e: Error) => e.message).join("\n"));
  }

  return json.data;
};

// Get all products or a limited number of products (default: 10)
export const getProducts = async (options: {
  limit?: number;
  buyerIP: string;
}) => {
  const { limit = 10, buyerIP } = options;


  const data = await makeShopifyRequest(
    ProductsQuery,
    { first: limit },
    buyerIP
  );
  const { products } = data;

  if (!products) {
    throw new Error("No products found");
  }

  const productsList = products.edges.map((edge: any) => edge.node);
  const ProductsResult = z.array(ProductResult);
  const parsedProducts = ProductsResult.parse(productsList);

  return parsedProducts;
};

export const getProductsPaginated = async (options: {
  limit?: number;
  after?: string | null;
  buyerIP: string;
}) => {
  const { limit = 10, after = null, buyerIP } = options;

  const data = await makeShopifyRequest(
    ProductsQuery,
    { first: limit, after },
    buyerIP
  );
  const { products } = data;

  if (!products) {
    throw new Error("No products found");
  }

  const productsList = products.edges.map((edge: any) => edge.node);
  const ProductsResult = z.array(ProductResult);
  const parsedProducts = ProductsResult.parse(productsList);

  const pageInfo = products.pageInfo as { hasNextPage: boolean; endCursor: string | null };

  return {
    products: parsedProducts,
    pageInfo,
  };
};

// Storefront API no provee productsCount

// Get step content by metaobject ID
export const getStepContent = async (stepId: string, buyerIP: string = "127.0.0.1") => {
  const data = await makeShopifyRequest(StepMetaobjectQuery, { id: stepId }, buyerIP);
  const { metaobject } = data;
  
  if (!metaobject) {
    return null;
  }
  
  // Transform fields into a more usable format
  const fields = metaobject.fields.reduce((acc: Record<string, any>, field: any) => {
    acc[field.key] = field.value;
    if (field.reference?.image) {
      acc[`${field.key}_image`] = field.reference.image;
    }
    return acc;
  }, {} as Record<string, any>);
  
  return {
    id: metaobject.id,
    handle: metaobject.handle,
    title: fields.step_title || fields.title || fields.name || '',
    description: fields.step_description || fields.description || fields.content || '',
    step_number: parseInt(fields.step_number) || 1,
    step_title: fields.step_title || '',
    step_description: fields.step_description || '',
    ...fields
  };
};

// Get FAQ content by metaobject ID
// FAQ metaobject type structure:
// - faq.faq_title: FAQ question (display name: "FAQ title")
// - faq.faq_description: FAQ answer (display name: "FAQ description")
export const getFAQContent = async (faqId: string, buyerIP: string = "127.0.0.1") => {
  const data = await makeShopifyRequest(StepMetaobjectQuery, { id: faqId }, buyerIP);
  const { metaobject } = data;
  
  if (!metaobject) {
    return null;
  }
  
  // Transform fields into a more usable format
  const fields = metaobject.fields.reduce((acc: Record<string, any>, field: any) => {
    acc[field.key] = field.value;
    if (field.reference?.image) {
      acc[`${field.key}_image`] = field.reference.image;
    }
    return acc;
  }, {} as Record<string, any>);
  
  return {
    id: metaobject.id,
    handle: metaobject.handle,
    question: fields.faq_title || fields.question || fields.title || '',
    answer: fields.faq_description || fields.answer || fields.description || fields.content || '',
    ...fields
  };
};

// Process steps with real content
export const processStepsWithContent = async (steps: any[], buyerIP: string = "127.0.0.1") => {
  const stepPromises = steps.map(async (step, index) => {
    try {
      const stepContent = await getStepContent(step.id, buyerIP);
      if (stepContent) {
        return stepContent;
      }
    } catch (error) {
      console.warn(`Error fetching step content for ${step.id}:`, error);
    }
    // Fallback si no se puede obtener el contenido
    return {
      id: step.id,
      handle: `step-${index + 1}`,
      title: `Step ${index + 1}`,
      description: `Step ${index + 1} description`,
      step_number: index + 1,
    };
  });
  
  return await Promise.all(stepPromises);
};

// Process FAQs with real content
export const processFAQsWithContent = async (faqs: any[], buyerIP: string = "127.0.0.1") => {
  const faqPromises = faqs.map(async (faq, index) => {
    try {
      const faqContent = await getFAQContent(faq.id, buyerIP);
      if (faqContent) {
        return faqContent;
      }
    } catch (error) {
      console.warn(`Error fetching FAQ content for ${faq.id}:`, error);
    }
    // Fallback si no se puede obtener el contenido
    return {
      id: faq.id,
      handle: `faq-${index + 1}`,
      question: `Pregunta ${index + 1}`,
      answer: 'Respuesta no disponible',
    };
  });
  
  return await Promise.all(faqPromises);
};


// Get a product by its handle (slug)
export const getProductByHandle = async (options: {
  handle: string;
  buyerIP: string;
}) => {
  const { handle, buyerIP } = options;


  const data = await makeShopifyRequest(
    ProductByHandleQuery,
    { handle },
    buyerIP
  );
  const { product } = data;

  const parsedProduct = ProductResult.parse(product);

  // Process steps with real content if they exist
  // if (parsedProduct.howToUse?.steps && parsedProduct.howToUse.steps.length > 0) {
  //   parsedProduct.howToUse.steps = await processStepsWithContent(parsedProduct.howToUse.steps, buyerIP);
  // }

  return parsedProduct;
};

export const getProductRecommendations = async (options: {
  productId: string;
  buyerIP: string;
}) => {
  const { productId, buyerIP } = options;
  
  
  const data = await makeShopifyRequest(
    ProductRecommendationsQuery,
    {
      productId,
    },
    buyerIP
  );
  const { productRecommendations } = data;

  const ProductsResult = z.array(ProductResult);
  const parsedProducts = ProductsResult.parse(productRecommendations);

  return parsedProducts;
};

// Get product by exact title using products(query:)
export const getProductByTitle = async (options: {
  title: string;
  buyerIP: string;
}) => {
  const { title, buyerIP } = options;
  // Shopify products query supports title filtering: title:'...'
  const query = `title:'${title.replace(/"/g, "\\\"")}'`;
  const data = await makeShopifyRequest(
    ProductsByQuery,
    { query, first: 1 },
    buyerIP
  );
  const { products } = data as any;
  if (!products || !products.edges || products.edges.length === 0) {
    throw new Error(`Product not found for title: ${title}`);
  }
  const node = products.edges[0].node;
  const parsed = ProductResult.parse(node);
  if (parsed?.howToUse?.steps && parsed.howToUse.steps.length > 0) {
    parsed.howToUse.steps = await processStepsWithContent(parsed.howToUse.steps, buyerIP);
  }
  return parsed;
};

// Create a cart and add a line item to it and return the cart object
export const createCart = async (id: string, quantity: number, buyerIP: string = "127.0.0.1") => {
  
  const data = await makeShopifyRequest(CreateCartMutation, { id, quantity }, buyerIP);
  const { cartCreate } = data;
  const { cart } = cartCreate;
  const parsedCart = CartResult.parse(cart);

  return parsedCart;
};

// Add a line item to an existing cart (by ID) and return the updated cart object
export const addCartLines = async (
  id: string,
  merchandiseId: string,
  quantity: number,
  buyerIP: string = "127.0.0.1"
) => {
  
  const data = await makeShopifyRequest(AddCartLinesMutation, {
    cartId: id,
    merchandiseId,
    quantity,
  }, buyerIP);
  const { cartLinesAdd } = data;
  const { cart } = cartLinesAdd;

  const parsedCart = CartResult.parse(cart);

  return parsedCart;
};

// Remove line items from an existing cart (by IDs) and return the updated cart object
export const removeCartLines = async (id: string, lineIds: string[]) => {
  
  const data = await makeShopifyRequest(RemoveCartLinesMutation, {
    cartId: id,
    lineIds,
  });
  const { cartLinesRemove } = data;
  const { cart } = cartLinesRemove;
  const parsedCart = CartResult.parse(cart);

  return parsedCart;
};

// Update line items in an existing cart (by line ID and new quantity) and return the updated cart object
export const updateCartLines = async (id: string, lineId: string, quantity: number) => {
  
  const data = await makeShopifyRequest(UpdateCartLinesMutation, {
    cartId: id,
    lines: [{ id: lineId, quantity }],
  });
  const { cartLinesUpdate } = data;
  const { cart } = cartLinesUpdate;
  const parsedCart = CartResult.parse(cart);

  return parsedCart;
};

// Get a cart by its ID and return the cart object
export const getCart = async (id: string) => {
  
  const data = await makeShopifyRequest(GetCartQuery, { id });

  const { cart } = data;
  const parsedCart = CartResult.parse(cart);

  return parsedCart;
};

// Get all collections or a limited number of collections (default: 50)
export const getCollections = async (options: {
  limit?: number;
  buyerIP: string;
}) => {
  const { limit = 50, buyerIP } = options;

  const data = await makeShopifyRequest(
    CollectionsQuery,
    { first: limit },
    buyerIP
  );
  const { collections } = data;

  if (!collections) {
    throw new Error("No collections found");
  }

  const collectionsList = collections.edges.map((edge: any) => edge.node);
  const CollectionsResult = z.array(CollectionResult);
  const parsedCollections = CollectionsResult.parse(collectionsList);

  return parsedCollections;
};

// Get products from a specific collection
export const getCollectionProducts = async (options: {
  handle: string;
  limit?: number;
  buyerIP: string;
}) => {
  const { handle, limit = 20, buyerIP } = options;

  const data = await makeShopifyRequest(
    CollectionProductsQuery,
    { handle, first: limit },
    buyerIP
  );
  const { collection } = data;

  if (!collection) {
    throw new Error("Collection not found");
  }

  const parsedCollection = CollectionWithProductsResult.parse(collection);
  const productsList = parsedCollection.products.edges.map((edge: any) => edge.node);

  return {
    ...parsedCollection,
    products: productsList,
  };
};

// Get products filtered by collection handle
export const getProductsByCollection = async (options: {
  collectionHandle: string;
  limit?: number;
  buyerIP: string;
}) => {
  const { collectionHandle, limit = 20, buyerIP } = options;

  // First get all products
  const data = await makeShopifyRequest(
    ProductsQuery,
    { first: 250 }, // Get more products to filter
    buyerIP
  );
  const { products } = data;

  if (!products) {
    throw new Error("No products found");
  }

  const productsList = products.edges.map((edge: any) => edge.node);
  
  // Filter products that belong to the specified collection
  const filteredProducts = productsList.filter((product: any) => {
    return product.collections.edges.some((edge: any) => 
      edge.node.handle === collectionHandle
    );
  }).slice(0, limit); // Apply limit after filtering

  const ProductsResult = z.array(ProductResult);
  const parsedProducts = ProductsResult.parse(filteredProducts);

  return parsedProducts;
};

// Get products filtered by collection handle (using collection handle as parameter)
export const getProductsByHandle = async (options: {
  collectionHandle: string;
  limit?: number;
  buyerIP: string;
}) => {
  const { collectionHandle, limit = 20, buyerIP } = options;

  // If collectionHandle is "all", return all products without filtering
  if (collectionHandle === "all") {
    const result = await getProductsPaginated({
      limit,
      buyerIP
    });
    return result.products;
  }

  // Use the existing getProductsByCollection function for specific collections
  return await getProductsByCollection({
    collectionHandle,
    limit,
    buyerIP
  });
};
