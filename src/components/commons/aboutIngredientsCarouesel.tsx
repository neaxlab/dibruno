import { useState, useEffect, useRef } from 'react';
import { Navigation, Scrollbar, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { AboutIngredients } from '../cards/aboutIngredients';
import { aboutIngredients } from '../../constants/home/products';
import './aboutIngredientsCarouesel.css';




export default function ProductsCarousel() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let animationId: number;
        let startTime: number;
        const speed = 0.1; // píxeles por milisegundo

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            
            if (!isHovered) {
                const elapsed = currentTime - startTime;
                const translateX = (elapsed * speed) % (container.scrollWidth / 2);
                container.style.transform = `translateX(-${translateX}px)`;
            }
            
            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);

        return () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        };
    }, [isHovered]);

    return (
        <div className="w-full overflow-hidden">
            <div 
                ref={containerRef}
                className="flex carousel-container"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Primera copia de los elementos */}
                {aboutIngredients.map((product, index) => (
                    <div key={`first-${index}`} className="flex-shrink-0 mx-4 min-w-fit">
                        <AboutIngredients image={product.image} name={product.name} />
                    </div>
                ))}
                {/* Segunda copia para el bucle infinito */}
                {aboutIngredients.map((product, index) => (
                    <div key={`second-${index}`} className="flex-shrink-0 mx-4 min-w-fit">
                        <AboutIngredients image={product.image} name={product.name} />
                    </div>
                ))}
            </div>
        </div>
    )
}