import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef, useEffect, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


import TestimonialsCard from '../cards/TestimonialsCard';
import { testimonials } from '../../constants/home/testimonials';




export default function TestimonialsCarousel() {
    const swiperRef = useRef<SwiperType | null>(null);
    const scrollbarRef = useRef<HTMLDivElement>(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    useEffect(() => {
        if (swiperRef.current && scrollbarRef.current) {
            const swiper = swiperRef.current;
            const scrollbar = scrollbarRef.current;
            const scrollbarDrag = scrollbar.querySelector('.swiper-scrollbar-drag') as HTMLElement;

            if (!scrollbarDrag) {
                const dragElement = document.createElement('div');
                dragElement.className = 'swiper-scrollbar-drag bg-primary-granite h-full';
                scrollbar.appendChild(dragElement);
            }

            const updateScrollbar = () => {
                const progress = swiper.progress;
                const scrollbarWidth = scrollbar.offsetWidth;
                // Calcular el ancho del drag basado en cuántos slides son visibles
                const slidesPerViewParam = swiper.params.slidesPerView;
                const slidesPerView = typeof slidesPerViewParam === 'number' ? slidesPerViewParam : 2.3;
                const totalSlides = swiper.slides.length;
                const visibleRatio = Math.min(slidesPerView / totalSlides, 1);
                const dragWidth = scrollbarWidth * visibleRatio;
                const maxLeft = scrollbarWidth - dragWidth;
                const left = progress * maxLeft;

                const drag = scrollbar.querySelector('.swiper-scrollbar-drag') as HTMLElement;
                if (drag) {
                    drag.style.width = `${dragWidth}px`;
                    drag.style.left = `${left}px`;
                    drag.style.position = 'absolute';
                    drag.style.top = '0';
                    drag.style.borderRadius = '9999px';
                }
            };

            const updateNavigation = () => {
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
            };

            swiper.on('slideChange', () => {
                updateScrollbar();
                updateNavigation();
            });
            swiper.on('progress', updateScrollbar);
            swiper.on('reachBeginning', updateNavigation);
            swiper.on('reachEnd', updateNavigation);
            updateScrollbar();
            updateNavigation();

            // Manejar el arrastre del scrollbar
            let isDragging = false;
            let startX = 0;
            let startProgress = 0;

            const handleMouseDown = (e: MouseEvent) => {
                isDragging = true;
                startX = e.clientX;
                startProgress = swiper.progress;
                e.preventDefault();
            };

            const handleMouseMove = (e: MouseEvent) => {
                if (!isDragging) return;
                const deltaX = e.clientX - startX;
                const scrollbarWidth = scrollbar.offsetWidth;
                const slidesPerViewParam = swiper.params.slidesPerView;
                const slidesPerView = typeof slidesPerViewParam === 'number' ? slidesPerViewParam : 2.3;
                const totalSlides = swiper.slides.length;
                const visibleRatio = Math.min(slidesPerView / totalSlides, 1);
                const dragWidth = scrollbarWidth * visibleRatio;
                const maxLeft = scrollbarWidth - dragWidth;
                const progressDelta = deltaX / maxLeft;
                const newProgress = Math.max(0, Math.min(1, startProgress + progressDelta));
                swiper.setProgress(newProgress);
            };

            const handleMouseUp = () => {
                isDragging = false;
            };

            const handleScrollbarClick = (e: MouseEvent) => {
                if (isDragging) return;
                const rect = scrollbar.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const scrollbarWidth = scrollbar.offsetWidth;
                const slidesPerViewParam = swiper.params.slidesPerView;
                const slidesPerView = typeof slidesPerViewParam === 'number' ? slidesPerViewParam : 2.3;
                const totalSlides = swiper.slides.length;
                const visibleRatio = Math.min(slidesPerView / totalSlides, 1);
                const dragWidth = scrollbarWidth * visibleRatio;
                const maxLeft = scrollbarWidth - dragWidth;
                const progress = Math.max(0, Math.min(1, (clickX - dragWidth / 2) / maxLeft));
                swiper.setProgress(progress);
            };

            scrollbar.addEventListener('mousedown', handleMouseDown);
            scrollbar.addEventListener('click', handleScrollbarClick);
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);

            return () => {
                swiper.off('slideChange');
                swiper.off('progress', updateScrollbar);
                swiper.off('reachBeginning', updateNavigation);
                swiper.off('reachEnd', updateNavigation);
                scrollbar.removeEventListener('mousedown', handleMouseDown);
                scrollbar.removeEventListener('click', handleScrollbarClick);
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, []);

    return (
        <section className="w-full h-full relative max-h-[400px]">
            <Swiper
                modules={[Navigation, Pagination, Scrollbar]}
                direction='horizontal'
                loop={false}
                slidesPerView={1.3}
                breakpoints={{
                    640: {
                        slidesPerView: 2.3,
                    },
                }}
                spaceBetween={12}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                className='w-full h-full overflow-visible relative'
            >
                {testimonials.map((testimonial, index) => (
                    <SwiperSlide key={`${index}`}>
                        <TestimonialsCard testimonial={testimonial} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="absolute left-4 right-4 sm:left-16 sm:right-16 !bottom-[-40px] flex flex-row items-center justify-center gap-14 z-10">
                <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    disabled={isBeginning}
                    className={`text-sm font-semibold transition-opacity flex items-center gap-2 ${isBeginning ? 'opacity-40 cursor-not-allowed' : 'opacity-100 hover:opacity-80 cursor-pointer'
                        }`}
                    aria-label="Slide anterior"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M4.78516 2.96484L1.75016 5.99985L4.78516 9.03485" stroke="black" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M10.25 6H1.835" stroke="black" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    Previous
                </button>
                <div
                    ref={scrollbarRef}
                    className="bg-primary-granite/20 custom-scrollbar swiper-scrollbar rounded-full cursor-pointer h-[4px] z-10 max-w-[1000px] flex-1"
                />
                <button
                    onClick={() => swiperRef.current?.slideNext()}
                    disabled={isEnd}
                    className={`text-primary-granite text-sm font-semibold transition-opacity flex items-center gap-2 ${isEnd ? 'opacity-40 cursor-not-allowed' : 'opacity-100 hover:opacity-80 cursor-pointer'
                        }`}
                    aria-label="Slide siguiente"
                >
                    Next
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M7.21484 2.96484L10.2498 5.99985L7.21484 9.03485" stroke="black" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M1.75 6H10.165" stroke="black" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
           
        </section>
    )
}