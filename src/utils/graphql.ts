const CART_FRAGMENT = `#graphql
fragment cartFragment on Cart {
  id
  totalQuantity
  checkoutUrl
  cost {
    subtotalAmount {
      amount
      currencyCode
    }
  }
  lines(first: 100) {
    nodes {
      id
      quantity
      merchandise {
        ...on ProductVariant {
          id
          title
          image {
            url
            altText
            width
            height
          }
          product {
            handle
            title
          }
        }
      }
      cost {
        amountPerQuantity{
          amount
          currencyCode
        }
        subtotalAmount {
          amount
          currencyCode
        }
        totalAmount {
          amount
          currencyCode
        }
      }
    }
  }
}
`;

const PRODUCT_FRAGMENT = `#graphql
fragment productFragment on Product {
  id
  title
  handle
  description
  images (first: 10) {
    nodes {
      url
      width
      height
      altText
    }
  }
  variants(first: 10) {
    nodes {
      id
      title
      availableForSale
      price {
        amount
        currencyCode
      }
      compareAtPrice {
        amount
      }
    }
  }
  featuredImage {
    url
    width
    height
    altText
  }
  collections(first: 5) {
    edges {
      node {
        id
        title
        handle
      }
    }
  }
  faq_s: metafield(namespace: "custom", key: "faq_s") {
    id
    namespace
    key
    value
    type
    reference {
      ... on Metaobject {
        id
        handle
        fields {
          key
          value 
        }
      }
    }
  }
  activeIngredients: metafield(namespace: "custom", key: "active_ingredients") {
    value
    type
    references(first: 10) {
      edges {
        node {
          ... on Metaobject {
            id
            handle
            fields {
              key
              value
              reference {
                ... on MediaImage {
                  image {
                    url
                    altText
                    width
                    height
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  about: metafield(namespace: "custom", key: "about") {
    id
    namespace
    key
    value
    type
    reference {
      ... on Metaobject {
        id
        handle
        fields {
          key
          value
          reference {
            ... on MediaImage {
              image {
                url
                altText
                width
                height
              }
            }
            ... on Metaobject {
              id
              handle
              fields {
                key
                value
              }
            }
          }
        }
      }
    }
  }
  howToUse: metafield(namespace: "custom", key: "how_to_use") {
    id
    namespace
    key
    value
    type
    reference {
      ... on Metaobject {
        id
        handle
        fields {
          key
          value
          reference {
            ... on MediaImage {
              image {
                url
                altText
                width
                height
              }
            }
            ... on Metaobject {
              id
              handle
              fields {
                key
                value
              }
            }
          }
        }
      }
    }
  }
}
`;

export const ProductsQuery = `#graphql
query ($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      edges {
        node {
          ...productFragment
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;

// Nota: Storefront API no tiene productsCount en QueryRoot

export const ProductByHandleQuery = `#graphql
  query ($handle: String!) {
    product(handle: $handle) {
      ...productFragment
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const StepMetaobjectQuery = `#graphql
  query ($id: ID!) {
    metaobject(id: $id) {
      id
      handle
      fields {
        key
        value
        reference {
          ... on MediaImage {
            image {
              url
              altText
              width
              height
            }
          }
        }
      }
    }
  }
`;

export const ProductRecommendationsQuery = `#graphql
  query ($productId: ID!) {
    productRecommendations(productId: $productId) {
      ...productFragment
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const GetCartQuery = `#graphql
  query ($id: ID!) {
    cart(id: $id) {
      ...cartFragment
    }
  }
  ${CART_FRAGMENT}
`;

export const CreateCartMutation = `#graphql
  mutation ($id: ID!, $quantity: Int!) {
    cartCreate (input: { lines: [{ merchandiseId: $id, quantity: $quantity }] }) {
      cart {
        ...cartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

export const AddCartLinesMutation = `#graphql
  mutation ($cartId: ID!, $merchandiseId: ID!, $quantity: Int) {
    cartLinesAdd (cartId: $cartId, lines: [{ merchandiseId: $merchandiseId, quantity: $quantity }]) {
      cart {
        ...cartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

export const RemoveCartLinesMutation = `#graphql
  mutation ($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove (cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...cartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

export const UpdateCartLinesMutation = `#graphql
  mutation ($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate (cartId: $cartId, lines: $lines) {
      cart {
        ...cartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

export const CollectionsQuery = `#graphql
  query ($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            url
            altText
          }
        }
      }
    }
  }
`;

export const CollectionProductsQuery = `#graphql
  query ($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      title
      description
      descriptionHtml
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 10) {
              edges {
                node {
                  url
                  altText
                  width
                  height
                }
              }
            }
            variants(first: 10) {
              nodes {
                id
                title
                availableForSale
                price {
                  amount
                  currencyCode
                }
              }
            }
            featuredImage {
              url
              altText
              width
              height
            }
          }
        }
      }
    }
  }
`;
