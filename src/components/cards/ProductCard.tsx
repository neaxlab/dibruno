import React from 'react';
import AddToCartButton from '@/components/cart/AddToCartButton';
import { getProductDiscount } from '@/constants/discounts';

type ProductCardProps = {
    product: any;
};

export default function ProductCard({ product }: ProductCardProps) {
    const treatmentValue = (product?.treatment?.references?.edges?.[0]?.node?.fields || [])
        .find((f: any) => f.key === 'treatment_type')?.value
        || product?.treatment?.ingredients?.[0]?.handle
        || null;
    const productDiscount = getProductDiscount(product?.handle || '');
    
    return (
        <article className="flex flex-col w-full text-primary-olive text-d-products">
            <div className="relative overflow-hidden bg-primary-bright z-10 group flex flex-col">
                <a href={`/products/${product.handle}`} className="h-full max-h-[615px] relative block">
                    <img src={product.featuredImage.url} alt={product.title} className="size-full max-h-[615px] object-cover cursor-pointer" />
                    <div 
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.00) 60.49%, rgba(0, 0, 0, 0.06) 100%)'
                        }}
                    />
                </a>
                {productDiscount && (
                    <div className="absolute top-3 right-3 bg-primary-discount p-1.5 sm:p-2 text-d-products text-sm sm:text-2xl text-primary-lotion rounded-md z-20">
                        -{productDiscount.discountPercent}% OFF
                    </div>
                )}
                
            </div>
            <div className="flex flex-col gap-3 justify-start items-start sm:px-8 px-4 sm:py-6 py-6 border-[0.75px] border-primary-silver">
                <div className="flex flex-col sm:min-h-[80px] min-h-[50px]">
                    {treatmentValue && (
                        <span className="text-[6F6F6F] sm:text-base text-sm font-light leading-[100%] tracking-[-0.32px]">
                            {treatmentValue}
                        </span>
                    )}
                    <h4 className="font-secondary text-[#212121] sm:text-[28px] text-[20px] font-normal leading-[100%] tracking-[-0.56px]">{product.title}</h4>
                </div>
                {product?.shortDescription?.value && (
                    <p className="sm:block hidden text-sm text-[#1D130A] font-light leading-[140%] tracking-[-0.28px]">
                        {product.shortDescription.value}
                    </p>
                )}
                <div className="flex flex-row items-center justify-between w-full">
                    {(() => {
                        const originalPrice = parseFloat(product.variants.nodes[0]?.price?.amount || '0');
                        
                        if (productDiscount && originalPrice > 0) {
                            const discountedPrice = originalPrice * (1 - productDiscount.discountPercent / 100);
                            return (
                                <div className="flex flex-row items-center gap-2">
                                    <span className="text-primary-granite leading-[100%] font-light text-[14px] line-through tracking-[2%] opacity-60">
                                        {`$${originalPrice.toFixed(2)}`}
                                    </span>
                                    <span className="leading-[100%] font-medium text-[20px] tracking-[2%] ml-2">
                                        {`$${discountedPrice.toFixed(2)}`}
                                    </span>
                                </div>
                            );
                        }
                        
                        if (product.variants.nodes[0]?.compareAtPrice) {
                            return (
                                <>
                                    <span className="leading-[100%] font-medium text-[20px] tracking-[2%] ">
                                        {`$${parseFloat(product.variants.nodes[0].price.amount).toFixed(2)}`}
                                    </span>
                                    <span className="text-primary-granite leading-[100%] font-light text-[14px] line-through tracking-[2%] ml-2">
                                        {parseFloat(product.variants.nodes[0].compareAtPrice.amount).toFixed(2)}
                                    </span>
                                </>
                            );
                        }
                        
                        return (
                            <span>
                                {`$${originalPrice.toFixed(2)}`}
                            </span>
                        );
                    })()}
                    <div className="flex flex-row items-center gap-2">
                    <AddToCartButton
                            variantId={product.variants.nodes[0].id}
                            variantQuantityAvailable={product.variants.nodes[0].quantityAvailable || 0}
                            variantAvailableForSale={product.variants.nodes[0].availableForSale}
                        />
                    </div>
                </div>
            </div>
        </article>
    );
}


