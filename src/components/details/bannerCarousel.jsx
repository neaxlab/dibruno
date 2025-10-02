import { useState } from 'react';
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


export default function TestimonialsCarousel({images}) {
    const [activeImage, setActiveImage] = useState(null);
    const [swiper, setSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleImageClick = (image) => {
        setActiveImage(image);
        swiper.slideTo(images.indexOf(image));
    }

    return (
        <section className="h-full font-sans relative sm:w-[60%] w-full">
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, Autoplay]}
                autoplay={{
                    delay: 3500,
                }}
                direction='horizontal'
                loop={false}
                slidesPerView={1}
                spaceBetween={0}
                onSwiper={setSwiper}
                onSlideChange={(swiper) => {
                    setActiveIndex(swiper.activeIndex);
                }}
                className='w-full h-full sm:rounded-[10px] rounded-lg'
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index} className="w-full h-full sm:rounded-[10px] rounded-lg">
                        <img 
                            src={image.url} 
                            alt={image.alt} 
                            className="w-full aspect-square object-center sm:rounded-[10px] rounded-lg" 
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="absolute -bottom-[45%] left-[10%] w-fit h-full flex-col gap-4 z-10 sm:flex hidden">
                {images.map((image, index) => (
                    <img 
                    key={index} 
                    src={image.url} 
                    alt={image.alt} 
                    onClick={() => handleImageClick(image)}
                    className={`size-16 object-cover rounded-[4px] hover:scale-110 transition-all duration-300 cursor-pointer ${activeIndex === index ? '' : 'opacity-60'}`} />
                ))}
            </div>
        </section>
    )
}