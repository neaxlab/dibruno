import React from 'react';
import AddToCartButton from '@/components/cart/AddToCartButton';

type ProductCardProps = {
    product: any;
};

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <article className="flex flex-col gap-4 w-full max-w-[421px] h-[614px] text-primary-olive text-d-products">
            <div className="relative w-full h-[552px] overflow-hidden bg-primary-bright z-10 group">
                <a href={`/shop/${product.handle}`}>
                    <img src={product.featuredImage.url} alt={product.title} className="w-full h-full object-cover cursor-pointer" />
                </a>
                {/* {product.discount && (
                    <div className="absolute top-3 right-3 bg-primary-discount p-3 text-d-secondary text-primary-lotion rounded-md">
                        -{product.discount}% OFF
                    </div>
                )} */}
                <div className="absolute bottom-0 left-0 w-full bg-[#F4F4F4] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex justify-center items-start px-6 py-10 gap-7 flex-col">
                    <div className="flex flex-row gap-4 text-d-footer z-1">
                        {product.size && (
                            <div className="flex flex-row gap-2 items-center">
                                <label className="text-d-tertiary text-primary-granite">Size</label>
                                <div className="relative">
                                    <select className="appearance-none border-[0.75px] border-[#C7C6C3] rounded-md  py-[10px] px-6 w-[128px] text-left text-d-secondary text-primary-granite focus:outline-none focus:border-primary-olive">
                                        {product.size.map((sizeOption: any) => (
                                            <option key={sizeOption} value={sizeOption}>{sizeOption}</option>
                                        ))}
                                    </select>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-primary-granite">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </span>
                                    <span className="pointer-events-none absolute inset-y-0 right-9 w-px bg-[#C7C6C3]"></span>
                                </div>
                            </div>
                        )}
                    </div>
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
                    <h4>{product.title}</h4>
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


