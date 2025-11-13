import type { Testimonial } from '../../types/testimonials';
import { getDiscount } from '../../hooks/discounts';

export default function TestimonialsCard({ testimonial }: { testimonial: Testimonial }) {
    return (
        <article className="flex flex-row gap-[1px] font-sans text-[#000000] text-base leading-[100%] tracking-[-0.346px] min-h-[400px]">
            <div className="flex flex-col">
                <div className="w-full sm:h-[596px] h-full rounded-lg">
                    <img
                        src={testimonial.images[0]}
                        alt="TestimonialsCard"
                        className="w-full sm:h-[596px] h-full object-cover"
                    />
                </div>
                <p className="w-full text-center bg-[#E7E7E7] py-3">
                    BEFORE
                </p>
            </div>
            <div className="flex flex-col">
                <div className="w-full sm:h-[596px] h-full rounded-lg">
                    <img
                        src={testimonial.images[1]}
                        alt="TestimonialsCard"
                        className="w-full sm:h-[596px] h-full object-cover"
                    />
                </div>
                <p className="w-full text-center bg-[#E7E7E7] py-3">
                    AFTER
                </p>
            </div>
            {/* Tarjeta de hover desactivada temporalmente (no se renderiza en ninguna vista)
                <div className="absolute bottom-0 left-0 w-full hidden sm:block h-0 group-hover:h-[150px] bg-primary-lotion transition-all duration-300 ease-in-out overflow-hidden">
                    <div className="flex flex-row justify-between items-center p-6 border border-primary-olive rounded-lg hover:border-none hover:bg-primary-bright transition-all duration-300 ease-in-out">
                        <div className="h-full flex flex-col justify-between items-start text-primary-bright max-h-[52px]">
                            <h3 className="text-d-primary text-primary-olive font-semibold">{testimonial.product.name}</h3>
                            <div className="flex flex-row gap-2 items-center">
                                {testimonial.product.discount ? (
                                    <>
                                        <span className="text-primary-olive font-semibold text-d-primary">{getDiscount(testimonial.product.price, testimonial.product.discount)}</span>
                                        <div className="flex flex-row text-xs gap-2">
                                            <span className="text-primary-granite line-through">${testimonial.product.price}</span>
                                            <span className="text-primary-lotion bg-primary-discount">-${testimonial.product.discount}% off</span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-primary-olive font-semibold text-d-primary">${testimonial.product.price}</span>
                                    </>
                                )}
                            </div>
                        </div>
                        <img src="/images/products/product-testimonials.png" alt="TestimonialsCard" className="w-[100px] h-[100px] object-cover" />
                    </div>
                </div>
            */}
        </article>
    )
}