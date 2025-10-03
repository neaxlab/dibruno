import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';




export default function CategoriesCarousel({categories}: {categories: string[]}) {
    return (
            <Swiper
                modules={[Navigation, Pagination, Scrollbar]}
                direction='horizontal'
                loop={false}
                slidesPerView={2}
                spaceBetween={16}
            >
                {categories.map((category, index) => (
                    <SwiperSlide key={index} className="!w-fit !mx-4">
                        <div className={`category-btn w-fit h-fit py-4 px-6 rounded-full border border-primary-granite text-d-secondary font-semibold hover:bg-primary-granite hover:text-primary-lotion cursor-pointer transition-all duration-300 ${index === 0 ? 'active bg-primary-granite text-primary-lotion' : 'text-primary-granite'}`}>
                            {category}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
    )
}