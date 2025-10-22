export interface ShopPolicy {
  title: string;
  body: string;
  url: string;
  handle: string;
}

export interface ShopPolicies {
  name: string;
  privacyPolicy: ShopPolicy | null;
  refundPolicy: ShopPolicy | null;
  shippingPolicy: ShopPolicy | null;
  termsOfService: ShopPolicy | null;
  subscriptionPolicy: ShopPolicy | null;
}

export interface ShopPoliciesResponse {
  shop: ShopPolicies;
}
