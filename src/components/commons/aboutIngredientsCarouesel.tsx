import { useState } from 'react';
import { Navigation, Scrollbar, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { AboutIngredients } from '../cards/aboutIngredients';
import { aboutIngredients } from '../../constants/home/products';




export default function ProductsCarousel() {
  
    return (
        <div className="w-full h-screen flex sm:flex-row flex-col gap-12">
            
            <Swiper
                modules={[Navigation, Scrollbar, Autoplay]}
                direction='horizontal'
                loop={true}
                slidesPerView={1}
                spaceBetween={20}
                autoplay={{ delay: 1000, disableOnInteraction: false }}
                allowTouchMove={false}
                className='w-full h-full relative'
            >
                {aboutIngredients.map((product, index) => (
                    <SwiperSlide key={`${product.name}-${index}`}>
                        <AboutIngredients image={product.image} name={product.name} />
                    </SwiperSlide> 
                ))}
                
            </Swiper>
        </div>
    )
}