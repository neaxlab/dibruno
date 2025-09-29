import { useState } from 'react';

import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-cards';

import {ingredients} from '../../constants/ingredients/ingredients';
import AnimatedLink from '../ui/buttons/AnimatedLink';
import NavigationButton from './navigationDirection';





export default function TestimonialsCarousel() {
const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [swiper2, setSwiper2] = useState<SwiperType | null>(null);

  const handlePrev = () => {
    if (swiper) {
      const current = swiper.realIndex;
      const total = ingredients.length;
      const newIndex = (current - 1 + total) % total;
      swiper.slideToLoop(newIndex);
      swiper2?.slideToLoop(newIndex);
      setActiveIndex(newIndex);
    }
  };

  const handleNext = () => {
    if (swiper) {
      const current = swiper.realIndex;
      const total = ingredients.length;
      const newIndex = (current + 1) % total;
      swiper.slideToLoop(newIndex);
      swiper2?.slideToLoop(newIndex);
      setActiveIndex(newIndex);
    }
  };
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
                className='w-full h-full overflow-visible relative'
                onSwiper={setSwiper}
                onSlideChange={(swiper) => {
                    setActiveIndex(swiper.activeIndex);
                }}
            >
                {ingredients.map((ingredient, index) => (
                    <SwiperSlide key={index}>
                        <div className="flex sm:flex-row flex-col gap-6">
                            <div className="w-[55%]">
                                <img src={ingredient.image} alt={ingredient.alt} className="w-full aspect-[16/11] object-cover rounded-md" />
                            </div>
                            <div className="w-[45%] flex flex-col justify-between">
                                <div className="flex sm:flex-row flex-col gap-6">
                                   <div className="w-[50%] overflow-hidden rounded-md">
                                        <img src={ingredient.nextImages[0]} alt="Ingredients" className="w-full aspect-[0.8] object-cover object-[0%_30%] scale-150 rounded-md grayscale" />
                                   </div>
                                   <div className="w-[50%] overflow-hidden rounded-md">
                                        <img src={ingredient.nextImages[1]} alt="Ingredients" className="w-full aspect-[0.8] object-cover object-[0%_30%] scale-150 rounded-md grayscale" />
                                   </div>
                                </div>
                                <div className="flex flex-row gap-6 relative">
                                    <div className="text-d-title-1 text-[57px] leading-[120%] font-semibold letter-spacing-[2%] text-primary-olive flex flex-col gap-4">
                                        <h1 className="">{ingredient.title}</h1>
                                        <p className="text-[28px] font-weight-[400] leading-[140%]">{ingredient.aubtext}</p>
                                    </div>
                                    <div className="justify-between items-center flex flex-row gap-4 absolute right-0 top-0">
                                        <NavigationButton direction="prev" onClick={handlePrev} />
                                        <NavigationButton direction="next" onClick={handleNext} />
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                grabCursor={true}
                
                modules={[Navigation, Pagination,]}
                direction='horizontal'
                loop={true}
                slidesPerView={1}
                allowTouchMove={true}
                breakpoints={{ 640: { allowTouchMove: false, }, }}
                spaceBetween={12}
                className='w-full h-full overflow-visible relative'
                onSwiper={setSwiper2}
            >
                {ingredients.map((ingredient, index) => (
                    <SwiperSlide key={index}>
                        <div className="flex flex-col gap-6 text-2xl leading-[140%] text-primary-granite">
                            <p className="text-center">{ingredient.description}</p>
                            <div className="flex flex-row gap-2 items-center justify-center">
                                <p>To learn more about this powerful active you can </p>
                                <AnimatedLink 
                                    text="READ THE PAPER"
                                    className="text-primary-granite text-2xl leading-[140%] font-medium"
                                    animationDuration={0.5}
                                    linePosition={-8}
                                />
                            </div>
                            <div className="flex flex-row   gap-6 w-fit mx-auto text-d-primary">
                                {
                                    ingredient.cards.map((card, index) => (
                                        <div key={index} className="flex flex-row gap-6 items-center w-[347px] h-[214px] border border-primary-silver rounded-[8px] p-6">
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