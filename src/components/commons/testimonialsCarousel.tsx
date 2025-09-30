import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


import TestimonialsCard from '../cards/TestimonialsCard';
import { testimonials } from '../../constants/home/testimonials';




export default function TestimonialsCarousel() {
    return (
        <section className="w-full h-full">
            <Swiper
                modules={[Navigation, Pagination, Scrollbar]}
                direction='horizontal'
                loop={false}
                slidesPerView={1}
                spaceBetween={12}
                breakpoints={{ 640: { slidesPerView: 1, spaceBetween: 16 }, 1024: { slidesPerView: 3.2, spaceBetween: 24 } , 1536: { slidesPerView: 4.2, spaceBetween: 24 } }}
                className='w-full h-full overflow-visible relative'
            >
                {testimonials.map((testimonial, index) => (
                    <SwiperSlide key={`${testimonial.image}-${index}`}>
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