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
