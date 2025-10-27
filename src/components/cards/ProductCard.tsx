import React from 'react';
import AddToCartButton from '@/components/cart/AddToCartButton';

type ProductCardProps = {
    product: any;
};

export default function ProductCard({ product }: ProductCardProps) {
    const treatmentValue = (product?.treatment?.references?.edges?.[0]?.node?.fields || [])
        .find((f: any) => f.key === 'treatment_type')?.value
        || product?.treatment?.ingredients?.[0]?.handle
        || null;
    return (
        <article className="flex flex-col sm:w-[397px] w-full text-primary-olive text-d-products">
            <div className="relative overflow-hidden bg-primary-bright z-10 group flex flex-col">
                <a href={`/product/${product.handle}`} className="w-full h-[500px]">
                    <img src={product.featuredImage.url} alt={product.title} className="size-full object-cover cursor-pointer" />
                </a>
                {/* {product.discount && (
                    <div className="absolute top-3 right-3 bg-primary-discount p-3 text-d-secondary text-primary-lotion rounded-md">
                        -{product.discount}% OFF
                    </div>
                )} */}
                <div className="absolute bottom-0 left-0 w-full bg-[#F4F4F4] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex justify-center items-start p-6 flex-col">

                    {product.variants?.nodes?.[0] && (
                        <AddToCartButton
                            variantId={product.variants.nodes[0].id}
                            variantQuantityAvailable={product.variants.nodes[0].quantityAvailable || 0}
                            variantAvailableForSale={product.variants.nodes[0].availableForSale}
                        />
                    )}
                </div>
            </div>
            <div className="flex flex-col justify-start items-start mt-[12px]">
                <div className="flex flex-col">
                    {treatmentValue && (
                        <span style={{ color: '#878787', fontSize: '14px', fontStyle: 'normal', fontWeight: 400, lineHeight: '120%', letterSpacing: '0.28px' }}>
                            {treatmentValue}
                        </span>
                    )}
                    <h4 className="text-d-secondary font-medium mt-[4px]">{product.title}</h4>
                </div>
                <div className="flex flex-row items-center mt-[12px]">
                    {product.variants.nodes[0].compareAtPrice ? (
                        <>
                            <span className="leading-[100%] font-medium text-[20px] tracking-[2%] ">
                                {`$${parseFloat(product.variants.nodes[0].price.amount).toFixed(2)}`}
                            </span>
                            <span className="text-primary-granite leading-[100%] font-light text-[14px] line-through tracking-[2%] ml-2">
                                {parseFloat(product.variants.nodes[0].compareAtPrice.amount).toFixed(2)}
                            </span>
                        </>
                    ) : (
                        <span>
                            {`$${parseFloat(product.variants.nodes[0].price.amount).toFixed(2)}`}
                        </span>
                    )}
                </div>
            </div>
        </article>
    );
}


