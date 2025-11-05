export interface ProductDiscount {
  handle: string;
  discountPercent: number;
}

export const PRODUCT_DISCOUNTS: ProductDiscount[] = [
  {
    handle: 'rootpure-vitalush-procapil-bundle',
    discountPercent: 20,
  },
  {
    handle: 'shielmist-sproutmist-procapil-mist-bundle',
    discountPercent: 20,
  },
  {
    handle: 'rootflourish-rootpure-growth-nourish-bundle',
    discountPercent: 20,
  },
  {
    handle: 'rootlite-glowlite-lightweight-fine-hair-bundle',
    discountPercent: 20,
  },
  {
    handle: 'growlite-shieldlite-procapil-mist-bundle',
    discountPercent: 20,
  },
  {
    handle: 'colorvive-rootpure-color-growth-bundle',
    discountPercent: 20,
  },
  {
    handle: 'scalpcalm-scalpsoothe-apiscalp-psoriasis-bundle',
    discountPercent: 20,
  },
];

/**
 * Obtiene el descuento de un producto por su handle
 * @param handle - El handle del producto
 * @returns El objeto ProductDiscount si existe, null si no tiene descuento
 */
export function getProductDiscount(handle: string): ProductDiscount | null {
  return PRODUCT_DISCOUNTS.find((discount) => discount.handle === handle) || null;
}

/**
 * Verifica si un producto tiene descuento
 * @param handle - El handle del producto
 * @returns true si el producto tiene descuento, false en caso contrario
 */
export function hasProductDiscount(handle: string): boolean {
  return getProductDiscount(handle) !== null;
}

