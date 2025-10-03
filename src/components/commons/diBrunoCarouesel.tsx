import { useState } from 'react';
import { Navigation, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


import ButtonSlide from '../ui/buttons/ButtonSlide';    
import Pagination from './pagination';
import NavigationButton from './navigationDirection';
import { slides } from '../../constants/home/products';



export default function ProductsCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [swiper2, setSwiper2] = useState<SwiperType | null>(null);

  const handlePrev = () => {
    if (swiper) {
      const current = swiper.realIndex;
      const total = slides.length;
      const newIndex = (current - 1 + total) % total;
      swiper.slideToLoop(newIndex);
      swiper2?.slideToLoop(newIndex);
      setActiveIndex(newIndex);
    }
  };

  const handleNext = () => {
    if (swiper) {
      const current = swiper.realIndex;
      const total = slides.length;
      const newIndex = (current + 1) % total;
      swiper.slideToLoop(newIndex);
      swiper2?.slideToLoop(newIndex);
      setActiveIndex(newIndex);
    }
  };
    return (
        <div className="w-full h-[850px] flex sm:flex-row flex-col gap-12">
            
            <Swiper
                modules={[Navigation, Scrollbar]}
                direction='horizontal'
                loop={false}
                slidesPerView={1}
                spaceBetween={12}
                onSwiper={setSwiper}
                onSlideChange={(swiper) => {
                    setActiveIndex(swiper.activeIndex);
                }}
                allowTouchMove={true}
                breakpoints={{ 640: { allowTouchMove: false, }, }}
                className='w-full h-full relative sm:!flex !hidden'
            >
                {slides.map((product, index) => (
                    <SwiperSlide key={`${product.product.name}-${index}`}>
                        <div className="w-full h-full">
                            <img src={product.imageLeft} alt={product.product.name} className="w-full h-full object-cover" />
                            <img src="/images/home/logo.svg" alt="DiBruno" className="w-[120px] h-[20px] object-cover absolute top-8 left-8" />
                        </div>
                    </SwiperSlide> 
                ))}
                <div className="absolute bottom-8 w-full flex justify-center items-center z-10">
                    <Pagination totalSlides={slides.length} activeIndex={activeIndex} />
                </div>
            </Swiper>
            <Swiper
                modules={[Navigation, Scrollbar]}
                direction='horizontal'
                loop={false}
                slidesPerView={1}
                spaceBetween={12}
                onSlideChange={(swiper) => {
                    setActiveIndex(swiper.activeIndex);
                }}
                allowTouchMove={true}
                breakpoints={{ 640: { allowTouchMove: false, }, }}
                scrollbar={{ el: '.custom-scrollbar', draggable: false, hide: false }}
                onSwiper={setSwiper2}
                className='w-full h-full relative'
            >
                {slides.map((product, index) => (
                    <SwiperSlide key={`${product.product.name}-${index}`}>
                        <div className="w-full h-full p-8 bg-primary-bright flex flex-col justify-between items-center">
                            <div className="w-full h-full flex justify-center items-center">
                            <img src={product.product.image} alt={product.product.name} className="h-[621px] object-cover" />
                            </div>
                            <div className="flex flex-col gap-6 w-full">
                                <div className="w-full justify-center items-center z-10 sm:!hidden !flex">
                                    <Pagination totalSlides={slides.length} activeIndex={activeIndex} />
                                </div>
                                <h3 className="sm:text-d-title-2 text-d-products text-primary-olive">{product.product.name}</h3>
                                <div className="flex flex-row w-full justify-between items-center">
                                    <ButtonSlide
                                        text={`BUY FOR $${product.product.price}`}
                                        href="#"
                                        normalBackground="transparent"
                                        normalColor="#3B3B3B"
                                        hoverBackground="#3B3B3B"
                                        hoverColor="#FAFAFA"
                                        borderColor="#3B3B3B"
                                        hoverBorderColor="#FAFAFA"
                                        transitionDuration="0.5s"
                                    /> 
                                    <span className="text-d-title-2 text-primary-olive sm:text-4xl">{`${index + 1}/${slides.length}`}</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
                <div className="justify-between items-center z-10 absolute w-full translate-x-[-50%] left-1/2 translate-y-[-50%] top-1/2 p-8 sm:!flex !hidden">
                    <NavigationButton direction="prev" onClick={handlePrev} />
                    <NavigationButton direction="next" onClick={handleNext} />
                </div>
            </Swiper>
            
        </div>
    )
}