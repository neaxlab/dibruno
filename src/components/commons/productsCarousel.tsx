import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


import ProductCard from '../cards/ProductCard';
import { products } from '../../constants/home/products';



export default function ProductsCarousel() {
    return (
        <section className="w-full h-full sm:pl-section-d-gap-x pl-section-m-gap-x">
            <Swiper
                modules={[Navigation, Pagination, Scrollbar]}
                direction='horizontal'
                loop={false}
                slidesPerView={1.15}
                spaceBetween={12}
                breakpoints={{ 640: { slidesPerView: 2, spaceBetween: 16 }, 1024: { slidesPerView: 3.2, spaceBetween: 24, }, 1536: { slidesPerView: 4.2, spaceBetween: 24 } }}
                scrollbar={{ el: '.custom-scrollbar', draggable: true, hide: false }}
                className='w-full h-full overflow-visible relative'
            >
                {products.map((product, index) => (
                    <SwiperSlide key={`${product.name}-${index}`}>
                        <ProductCard product={product} />
                    </SwiperSlide>
                ))}
                <div className="custom-scrollbar swiper-scrollbar absolute left-4 right-4 sm:left-16 sm:right-16 !bottom-[-40px] h-[4px] z-10" />
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