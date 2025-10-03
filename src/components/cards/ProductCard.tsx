import React from 'react';
import AddToCartButton from '@/components/cart/AddToCartButton';

type ProductCardProps = {
    product: any;
};

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <article className="flex gap-4 flex-col sm:w-[397px] w-full text-primary-olive text-d-products">
            <div className="relative size-full overflow-hidden bg-primary-bright z-10 group flex flex-col gap-4">
                <a href={`/shop/${product.handle}`} className="w-full h-[500px]">
                    <img src={product.featuredImage.url} alt={product.title} className="size-full object-cover cursor-pointer" />
                </a>
                {/* {product.discount && (
                    <div className="absolute top-3 right-3 bg-primary-discount p-3 text-d-secondary text-primary-lotion rounded-md">
                        -{product.discount}% OFF
                    </div>
                )} */}
                <div className="absolute bottom-0 left-0 w-full bg-[#F4F4F4] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex justify-center items-start p-6 gap-7 flex-col">

                    {product.variants?.nodes?.[0] && (
                        <AddToCartButton
                            variantId={product.variants.nodes[0].id}
                            variantQuantityAvailable={product.variants.nodes[0].quantityAvailable || 0}
                            variantAvailableForSale={product.variants.nodes[0].availableForSale}
                        />
                    )}
                </div>
            </div>
            <div className="flex flex-row justify-between items-start">
                <div className="flex flex-col">
                    <h4 className="text-d-secondary font-medium">{product.title}</h4>
                    <span className="text-d-secondary letter-spacing-[2%] line-height-[100%] text-primary-granite">
                        {product.category}
                    </span>
                </div>
                <div className="flex flex-row gap-[10px] items-center">
                    {product.variants.nodes[0].compareAtPrice ? (
                        <>
                            <span className="text-primary-granite leading-[100%] font-light text-[14px] line-through tracking-[2%]">
                                {product.variants.nodes[0].compareAtPrice.amount}
                            </span>
                            <span className="leading-[100%] font-medium text-[20px] tracking-[2%] ">
                                {`$${product.variants.nodes[0].price.amount}`}
                            </span>
                        </>
                    ) : (
                        <span>
                            {`$${product.variants.nodes[0].price.amount}`}
                        </span>
                    )}
                </div>
            </div>
        </article>
    );
}


