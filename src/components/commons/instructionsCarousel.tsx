import { useState } from 'react';
import { Navigation, Pagination as SwiperPagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import Pagination from './pagination';



export default function TestimonialsCarousel({ productsLite }: { productsLite: any[] }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [swiper, setSwiper] = useState<SwiperType | null>(null);  

    return (
        <section className="sm:hidden w-full h-full font-sans">
            <Swiper
                modules={[Navigation, SwiperPagination, Scrollbar]}
                direction='horizontal'
                loop={false}
                slidesPerView={1}
                spaceBetween={12}
                className='w-full h-full overflow-visible relative'
                onSwiper={setSwiper}
                onSlideChange={(swiper) => {
                    setActiveIndex(swiper.activeIndex);
                }}
            >
                {productsLite.map((product, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative h-max-[493px] w-full">
                            <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                            <a href={`/products/${product.handle}`} className="absolute bottom-[65px] left-4 text-d-button text-[#FEFEFE] text-center border-[1.5px] border-[#FEFEFE] rounded-full pl-5 py-4" style={{width: 'calc(100% - 32px)'}}>
                                LEARN MORE
                            </a>
                        </div>
                        <div className="flex flex-col gap-2 p-7 bg-primary-bright">
                            <h1 className="text-d-title-2">HOW TO USE?</h1>
                            {product.howToUse && <div className="flex flex-col gap-4" id="instructions-content">
                                {product.howToUse.steps.map((instruction: any, instructionIndex: number) => (
                                    <div key={instructionIndex} className="flex flex-row gap-2 items-center">
                                        <div className="flex flex-col gap-1">
                                            <h1 className="text-2xl font-medium">{`${instructionIndex + 1}. ${instruction.title}`}</h1>
                                            <p className="text-d-products text-primary-granite font-normal">{instruction.description}</p>
                                        </div>
                                    </div>
                                )) || <p className="text-d-products text-primary-granite font-normal">No instructions available</p>}
                            </div>}
                        </div>
                    </SwiperSlide>
                ))}
                <div className="w-full justify-center items-center z-10 sm:!hidden !flex pb-20 pt-10 absolute top-[350px] left-0">
                    <Pagination totalSlides={productsLite.length} activeIndex={activeIndex} />
                </div>
            </Swiper>
        </section>
    )
}