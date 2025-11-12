import { useEffect, useState } from 'react';
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
import { getProducts } from '@/utils/shopify';



export default function ProductsCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [swiper2, setSwiper2] = useState<SwiperType | null>(null);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const data = await getProducts({ limit: 2, buyerIP: '127.0.0.1' });
        if (isMounted) setProducts(data);
      } catch (e) {
        console.error('Error fetching products for carousel', e);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  const handlePrev = () => {
    if (swiper) {
      const current = swiper.realIndex;
      const total = products.length;
      const newIndex = (current - 1 + total) % total;
      swiper.slideToLoop(newIndex);
      swiper2?.slideToLoop(newIndex);
      setActiveIndex(newIndex);
    }
  };

  const handleNext = () => {
    if (swiper) {
      const current = swiper.realIndex;
      const total = products.length;
      const newIndex = (current + 1) % total;
      swiper.slideToLoop(newIndex);
      swiper2?.slideToLoop(newIndex);
      setActiveIndex(newIndex);
    }
  };
    return (
        <div className="w-full h-[745px] flex sm:flex-row flex-col gap-20 lg:px-48 sm:px-32 px-4">
            
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
                className='w-full h-full relative sm:!flex !hidden rounded'
            >
                {['/images/home/sliderLeft1.png','/images/home/sliderLeft2.png'].map((imageSrc, index) => (
                    <SwiperSlide key={`left-image-${index}`}>
                        <div className="w-full h-full">
                            <img src={imageSrc} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
                            <img src="/images/home/logo.svg" alt="DiBruno" className="w-[120px] h-[20px] object-cover absolute top-8 left-8" />
                        </div>
                    </SwiperSlide> 
                ))}
                {/* <div className="absolute bottom-8 w-full flex justify-center items-center z-10">
                    <Pagination totalSlides={2} activeIndex={activeIndex} />
                </div> */}
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
                className='w-full h-full relative rounded'
            >
                {products.map((product, index) => (
                    <SwiperSlide key={`${product.handle}-${index}`}>
                        <div className="w-full h-full flex flex-col justify-between items-center overflow-hidden">
                            <div className="flex flex-col mb-12">
                                <h1 className="mb-6 text-center secondary-font text-[#212121] sm:text-[48px] text-[32px] font-normal leading-[100%] tracking-[-0.96px]">Pure by nature</h1>
                                <p className="text-center text-[#1D1B1B] sm:text-base text-sm font-normal leading-[130%] tracking-[-0.32px]">All our products are made with vegan and natural formulas that care for you and the planet.</p>
                            </div>
                            <div className="w-full flex-1 min-h-0 flex justify-center items-center">
                                <img src={product.featuredImage?.url} alt={product.title} className="w-full h-full object-contain" />
                            </div>
                            <div className="flex flex-col w-full">
                                {/* <div className="w-full justify-center items-center z-10 sm:!hidden !flex">
                                    <Pagination totalSlides={2} activeIndex={activeIndex} />
                                </div> */}
                                <span className="mt-6 text-center text-[#6F6F6F] text-base font-normal leading-[100%] tracking-[-0.32px]">{product?.treatment?.ingredients?.[0]?.handle}</span>
                                <h3 className="mb-4 text-center secondary-font text-[#212121] sm:text-[28px] text-2xl font-normal leading-[100%] tracking-[-0.56px]">{product.title}</h3>
                                <p className="text-center text-[14px] text-[#1D130A] font-light leading-[140%] tracking-[-0.28px]">{product.shortDescription.value}</p>
                                <div className="flex flex-row w-full justify-center items-center mt-10">
                                    <ButtonSlide
                                        text={`BUY NOW`}
                                        href={`/products/${product.handle}`}
                                        normalBackground="transparent"
                                        normalColor="#3B3B3B"
                                        hoverBackground="#3B3B3B"
                                        hoverColor="#FAFAFA"
                                        borderColor="#3B3B3B"
                                        hoverBorderColor="#FAFAFA"
                                        transitionDuration="0.5s"
                                        className="px-8 py-4"
                                    /> 
                                    {/* <span className="text-d-title-2 text-primary-olive sm:text-4xl">{`${index + 1}/2`}</span> */}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
                {/* <div className="justify-between items-center z-10 absolute w-full translate-x-[-50%] left-1/2 translate-y-[-50%] top-1/2 p-8 sm:!flex !hidden">
                    <NavigationButton direction="prev" onClick={handlePrev} />
                    <NavigationButton direction="next" onClick={handleNext} />
                </div> */}
            </Swiper>
            
        </div>
    )
}