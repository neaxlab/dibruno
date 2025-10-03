import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useState, useEffect } from 'react';
import './faqs.css';

import { faqs, categories } from '../../constants/faqs/faqs';

export default function CategoriesCarousel() {
    const [openFAQs, setOpenFAQs] = useState({});
    const [selectedCategory, setSelectedCategory] = useState("All");

    const toggleFAQ = (index) => {
        setOpenFAQs(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    // Filtrar FAQs basado en la categoría seleccionada
    const filteredFAQs = selectedCategory === "All" 
        ? faqs 
        : faqs.filter(faq => faq.category === selectedCategory);

    useEffect(() => {
        const categoryButtons = document.querySelectorAll('.category-btn');
        
        // Aplicar estilos activos a la categoría "All" por defecto
        categoryButtons.forEach((button, index) => {
            if (button.textContent.trim() === selectedCategory) {
                button.classList.add('active');
                button.classList.add('bg-primary-granite');
                button.classList.add('text-primary-lotion');
                button.classList.remove('text-primary-granite');
            } else {
                button.classList.remove('active');
                button.classList.remove('bg-primary-granite');
                button.classList.remove('text-primary-lotion');
                button.classList.add('text-primary-granite');
            }
        });
    }, [selectedCategory]);

    return (
        <div className="w-full h-full">
            <div className="w-full h-full flex flex-row justify-center items-center sm:py-section-m-gap-y py-10">
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar]}
                    direction='horizontal'
                    loop={false}
                    slidesPerView={2}
                    spaceBetween={16}
                    allowTouchMove={true}
                    breakpoints={{ 640: { allowTouchMove: false, }, }}
                >
                {categories.map((category, index) => (
                    <SwiperSlide key={index} className="!w-fit !mx-4">
                        <div 
                            className="category-btn w-fit h-fit py-4 px-6 rounded-full text-primary-granite border border-primary-granite text-d-secondary font-semibold hover:bg-primary-granite hover:text-primary-lotion cursor-pointer transition-all duration-300"
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </div>
                    </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="w-full h-full sm:px-16 px-section-m-gap-x">
                {filteredFAQs.map((faq, index) => {
                    const isOpen = openFAQs[index] || false;
                    
                    return (
                        <div key={index} className="w-full py-10 border-b border-primary-silver">
                            <div 
                                className="flex flex-row justify-between items-center cursor-pointer hover:bg-gray-50 rounded transition-colors duration-200"
                                onClick={() => toggleFAQ(index)}
                            >
                                <h1 className="flex-1 pr-4 text-d-primary font-medium">{faq.question}</h1>
                                <img 
                                    src="/images/home/close-icon.svg" 
                                    alt="Toggle FAQ" 
                                    className={`faq-icon size-6 ${isOpen ? 'rotated' : ''}`}
                                />
                            </div>
                            <div className={ `faq-content ${isOpen ? 'expanded' : 'collapsed'}`}>
                                    <p className="text-d-products text-primary-granite font-normal">{faq.answer}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}