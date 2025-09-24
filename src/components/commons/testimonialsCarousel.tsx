import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


import type { Testimonial } from '../../types/testimonials';
import TestimonialsCard from '../cards/TestimonialsCard';


const testimonials: Testimonial[] = [
    {
        image: "/images/testimonials/testimonials-1.png",
        product: {
            image: "/images/products/product-testimonials.png",
            name: "Perfect Combo",
            price: 258.28,
            discount: 10
        }
    },
    {
        image: "/images/testimonials/testimonials-2.png",
        product: {
            image: "/images/products/product-testimonials.png",
            name: "Perfect Combo",
            price: 258.28,
            discount: 10
        }
    },
    {
        image: "/images/testimonials/testimonials-3.png",
        product: {
            image: "/images/products/product-testimonials.png",
            name: "Perfect Combo",
            price: 258.28,
            discount: 10
        }
    },
    {
        image: "/images/testimonials/testimonials-4.png",
        product: {
            image: "/images/products/product-testimonials.png",
            name: "Perfect Combo",
            price: 258.28,
            discount: 10
        }
    },
    {
        image: "/images/testimonials/testimonials-5.png",
        product: {
            image: "/images/products/product-testimonials.png",
            name: "Perfect Combo",
            price: 258.28,
            discount: 10
        }
    },
    {
        image: "/images/testimonials/testimonials-1.png",
        product: {
            image: "/images/products/product-testimonials.png",
            name: "Perfect Combo",
            price: 258.28,
            discount: 10
        }
    },
    {
        image: "/images/testimonials/testimonials-6.png",
        product: {
            image: "/images/products/product-testimonials.png",
            name: "Perfect Combo",
            price: 258.28,
            discount: 10
        }
    },
    {
        image: "/images/testimonials/testimonials-7.png",
        product: {
            image: "/images/products/product-testimonials.png",
            name: "Perfect Combo",
            price: 258.28,
            discount: 10
        }
    },
    {
        image: "/images/testimonials/testimonials-8.png",
        product: {
            image: "/images/products/product-testimonials.png",
            name: "Perfect Combo",
            price: 258.28,
            discount: 10
        }
    }
]

export default function TestimonialsCarousel() {
    return (
        <section className="w-full h-full sm:pl-section-d-gap-x px-section-m-gap-x">
            <Swiper
                modules={[Navigation, Pagination, Scrollbar]}
                direction='horizontal'
                loop={false}
                slidesPerView={1}
                spaceBetween={12}
                breakpoints={{ 640: { slidesPerView: 1, spaceBetween: 16 }, 1024: { slidesPerView: 3.2, spaceBetween: 24 } }}
                className='w-full h-full overflow-visible relative'
            >
                {testimonials.map((testimonial) => (
                    <SwiperSlide key={testimonial.product.name}>
                        <TestimonialsCard testimonial={testimonial} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <style>{`
                .custom-scrollbar.swiper-scrollbar {
                    height: 4px !important;
                    background: #EDEDED;
                    border-radius: 9999px;
                    opacity: 1;
                }
                .custom-scrollbar .swiper-scrollbar-drag {
                    background: #5A5A5A;
                    border-radius: 9999px;
                    height: 100%;
                }
            `}</style>
        </section>
    )
}