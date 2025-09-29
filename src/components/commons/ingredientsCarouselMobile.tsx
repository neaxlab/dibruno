import { useState } from 'react';

import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-cards';

import { ingredients } from '../../constants/ingredients/ingredients';
import AnimatedLink from '../ui/buttons/AnimatedLink';
import NavigationButton from './navigationDirection';





export default function TestimonialsCarousel() {
    return (
        <section className="w-full h-full font-sans flex flex-col gap-12">
            <Swiper
                grabCursor={true}

                modules={[Navigation, Pagination,]}
                direction='horizontal'
                loop={true}
                slidesPerView={1}
                spaceBetween={12}
                allowTouchMove={true}
                breakpoints={{ 640: { allowTouchMove: false, }, }}
                className='w-full h-full'
            >
                {ingredients.map((ingredient, index) => (
                    <SwiperSlide key={index}>
                        <div className="flex sm:flex-row flex-col gap-6">
                            <img src={ingredient.image} alt={ingredient.alt} className="w-full aspect-[16/11] object-cover rounded-md" />
                            <div className="text-d-title-1 text-[40px] leading-[120%] font-semibold letter-spacing-[2%] text-primary-olive flex flex-col gap-2">
                                <h1 className="">{ingredient.title}</h1>
                                <p className="text-d-secondary font-weight-[400] leading-[140%]">{ingredient.aubtext}</p>
                            </div>
                            <p className="text-left text-d-secondary text-primary-granite">{ingredient.description}</p>
                            <div className="flex flex-row gap-2 text-d-secondary text-primary-granite">
                                <p>To learn more about this powerful active you can <a href="#" className="text-primary-granite font-medium">READ THE PAPER</a></p>

                            </div>
                            <div className="flex flex-col   gap-2 w-fit mx-auto text-d-primary text-primary-granite">
                                {
                                    ingredient.cards.map((card, index) => (
                                        <div key={index} className="flex flex-row gap-6 items-center w-full h-auto border border-primary-silver rounded-[8px] p-6">
                                            <p>{card}</p>
                                        </div>
                                    ))
                                }
                            </div>

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

        </section>
    )
}