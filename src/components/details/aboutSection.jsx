import { useState, useRef, useEffect } from 'react';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './information.css';

const buttons = [
    {
        text: "ABOUT",
        value: "about",
    },
    {
        text: "INGREDIENTS",
        value: "ingredients",
    },
    {
        text: "HOW TO USE",
        value: "how-to-use",
    },
    {
        text: "FAQS",
        value: "faqs",
    },
]


export default function AboutSection({ product }) {
    const [activeImage, setActiveImage] = useState(null);
    const [swiper, setSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [expandedFaqs, setExpandedFaqs] = useState({});
    const [ingredientsPage, setIngredientsPage] = useState(0);
    const tabContainerRef = useRef(null);
    const tabSliderRef = useRef(null);

    const handleImageClick = (image) => {
        setActiveImage(image);
        swiper.slideTo(images.indexOf(image));
    }

    // Función para mover el slider al botón activo
    const moveSlider = (buttonIndex) => {
        if (!tabContainerRef.current || !tabSliderRef.current) return;

        const tabContainer = tabContainerRef.current;
        const tabSlider = tabSliderRef.current;
        const buttons = tabContainer.querySelectorAll('.tab-button');
        const button = buttons[buttonIndex];

        if (!button) return;

        // Obtener la posición del botón relativa al contenedor
        const buttonRect = button.getBoundingClientRect();
        const containerRect = tabContainer.getBoundingClientRect();

        // Calcular posición exacta del botón dentro del contenedor
        const left = buttonRect.left - containerRect.left;
        const top = buttonRect.top - containerRect.top;
        const width = buttonRect.width;
        const height = buttonRect.height;

        // Aplicar posición y tamaño al slider
        tabSlider.style.width = width + "px";
        tabSlider.style.height = height + "px";
        tabSlider.style.left = left + "px";
        tabSlider.style.top = top + "px";
    }

    // Manejador de click para los tabs
    const handleTabClick = (index) => {
        setActiveIndex(index);
        moveSlider(index);
        if (swiper) {
            swiper.slideTo(index);
        }
    }

    // Manejador para toggle de FAQs
    const toggleFaq = (faqId) => {
        setExpandedFaqs(prev => ({
            ...prev,
            [faqId]: !prev[faqId]
        }));
    }

    // Efecto para inicializar la posición del slider
    useEffect(() => {
        if (tabContainerRef.current && tabSliderRef.current) {
            moveSlider(activeIndex);
        }
    }, [activeIndex]);

    // Efecto para manejar el resize de la ventana
    useEffect(() => {
        const handleResize = () => {
            moveSlider(activeIndex);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [activeIndex]);

    const ingredients = product?.active_ingredients?.images ?? [];
    const totalIngredients = ingredients.length;
    const pageSize = 3;
    const totalPages = Math.ceil(totalIngredients / pageSize) || 0;

    const getVisibleIngredients = () => {
        if (totalIngredients <= pageSize) return ingredients;
        const start = ingredientsPage * pageSize;
        const end = Math.min(start + pageSize, totalIngredients);
        return ingredients.slice(start, end);
    };

    const showPrevIngredients = () => {
        if (ingredientsPage <= 0) return;
        setIngredientsPage((prev) => Math.max(0, prev - 1));
    };

    const showNextIngredients = () => {
        if (ingredientsPage >= totalPages - 1) return;
        setIngredientsPage((prev) => Math.min(totalPages - 1, prev + 1));
    };

    return (
        <section className="w-full -font-sans px-section-d-gap-x pt-[200px] flex flex-col gap-10">
            <h1 class="text-d-title-1 text-primary-olive text-center">
                INSIDE THE BOTTLE
            </h1>
            <div
                ref={tabContainerRef}
                className="tab-container flex flex-row w-full justify-between p-3 gap-10 bg-[#FFFFFF] rounded-full"
            >
                <div ref={tabSliderRef} className="tab-slider"></div>
                {buttons.map((button, index) => (
                    <button
                        key={button.value}
                        onClick={() => handleTabClick(index)}
                        className={`tab-button text-d-secondary leading-none ${activeIndex === index ? 'active' : ''}`}
                        data-tab={button.value}
                    >
                        {button.text}
                    </button>
                ))}
            </div>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar]}
                direction='horizontal'
                loop={false}
                slidesPerView={1}
                spaceBetween={0}
                onSwiper={setSwiper}
                onSlideChange={(swiper) => {
                    setActiveIndex(swiper.activeIndex);
                }}
                className='w-full h-full'
                allowTouchMove={false}
            >
                <SwiperSlide key={1} className="w-full h-full">
                    <div class="grid sm:grid-cols-2 grid-cols-1 gap-10 tab-content" data-content="about">
                        <div class="w-full h-full justify-center items-center flex">
                            <img
                                src={product.full_image.url}
                                alt={product.full_image.altText}
                                class="w-full h-full max-w-[600px] object-cover"
                            />
                        </div>
                        <div
                            class="w-full h-full flex flex-col gap-1 justify-center items-start"
                        >
                            <h2
                                class="text-d-secondary font-light leading-none text-primary-granite"
                            >
                                ABOUT THE PRODUCT
                            </h2>
                            <p
                                class="text-d-products font-medium leading-[140%] text-primary-olive"
                            >
                                {product.full_description.value}
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide key={2} className="w-full h-full">
                    <div class="grid-cols-1 tab-content">
                        <div class="flex flex-row gap-10">
                            <div
                                class="w-[40%] h-full flex flex-col gap-1 justify-center items-start"
                            >
                                <h2
                                    class="text-d-secondary font-light leading-none text-primary-granite"
                                >
                                    KEY INGREDIENTS
                                </h2>
                                <p
                                    class="text-d-products font-medium leading-[140%] text-primary-olive"
                                >
                                    A powerful blend of natural actives designed to nourish the
                                    scalp, strengthen follicles, and support thicker,
                                    healthier-looking hair.
                                </p>
                            </div>
                            <div class="w-[60%] h-full relative pt-12">
                                {totalIngredients > pageSize && (
                                    <div class="absolute top-0 right-0 flex flex-row gap-2">
                                        <button
                                            type="button"
                                            onClick={showPrevIngredients}
                                            disabled={ingredientsPage === 0}
                                            class={`paginate-btn left size-10 flex items-center justify-center rounded-full bg-transparent ${ingredientsPage === 0 ? 'cursor-not-allowed' : ''}`}
                                            aria-label="Ver ingredientes anteriores"
                                        >
                                            <img src="/images/home/arrow-paginate.svg" alt="Anterior" class="arrow-anim size-6" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={showNextIngredients}
                                            disabled={ingredientsPage >= totalPages - 1}
                                            class={`paginate-btn right size-10 flex items-center justify-center rounded-full bg-transparent ${ingredientsPage >= totalPages - 1 ? 'cursor-not-allowed' : ''}`}
                                            aria-label="Ver siguientes ingredientes"
                                        >
                                            <img src="/images/home/arrow-paginate.svg" alt="Siguiente" class="arrow-anim size-6" />
                                        </button>
                                    </div>
                                )}
                                <div class="flex-1 flex flex-col gap-8">
                                    {
                                        getVisibleIngredients().map((ingredient, idx) => (
                                            <div key={`${ingredient.title}-${idx}`} class="flex flex-row gap-10 items-center">
                                                <div class="w-fit h-fit">
                                                    <img
                                                        src={ingredient.url}
                                                        alt={ingredient.altText}
                                                        class="w-full max-w-[253px] h-full max-h-[138px] object-cover"
                                                    />
                                                </div>
                                                <div class="w-full h-full flex flex-col gap-1 justify-center items-start">
                                                    <h2 class="text-d-primary text-primary-olive">
                                                        {ingredient.title}
                                                    </h2>
                                                    <p class="text-d-primary text-primary-granite">
                                                        {ingredient.description}
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide key={3} className="w-full h-full">
                    <div class="grid sm:grid-cols-2 grid-cols-1 gap-10 tab-content">
                        <div
                            class="w-full h-full flex flex-col gap-1 justify-center items-start"
                        >
                            <div
                                class="flex flex-col gap-10 h-full text-primary-olive"
                                dangerouslySetInnerHTML={{ __html: product.how_to_use.value }}
                            />
                        </div>
                        <div class="w-full h-full justify-center items-center flex">
                            <img
                                src={product.full_image.url}
                                alt={product.full_image.altText}
                                class="w-full h-full max-w-[600px] object-cover justify-center items-center"
                            />
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide key={4} className="w-full h-full">
                    <div class="grid-cols-1 gap-10 tab-content" data-content="faqs">
                        <h2
                            class="text-d-secondary font-light leading-none text-primary-granite"
                        >
                            FREQUENTLY ASKED QUESTIONS
                        </h2>
                        <div className="">
                            <div
                                className="faq-item flex flex-col gap-5 text-primary-olive border-b py-5 border-primary-olive"
                            >
                                <div
                                    onClick={() => toggleFaq('faq1')}
                                    className="faq-header flex flex-row justify-between items-center cursor-pointer hover:bg-gray-50 rounded transition-colors duration-400"
                                >
                                    <h1 className="flex-1 pr-4 text-d-primary font-medium">
                                        What causes hair loss or alopecia?
                                    </h1>
                                    <img
                                        src="/images/home/close-icon.svg"
                                        alt="Toggle FAQ"
                                        className={`faq-icon transition-transform duration-200 ${expandedFaqs['faq1'] ? 'rotate-45' : ''}`}
                                    />
                                </div>
                                <div className={`faq-content px-4 transition-all duration-300 overflow-hidden ${expandedFaqs['faq1'] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <p className="text-d-products text-primary-granite font-normal">
                                        DiBruno is a brand that sells products for hair and skin care. Our products are formulated with natural ingredients to help with hair loss and promote healthier hair growth.
                                    </p>
                                </div>
                            </div>
                            <div
                                className="faq-item flex flex-col gap-5 text-primary-olive border-b py-5 border-primary-olive"
                            >
                                <div
                                    onClick={() => toggleFaq('faq2')}
                                    className="faq-header flex flex-row justify-between items-center cursor-pointer hover:bg-gray-50 rounded transition-colors duration-400"
                                >
                                    <h1 className="flex-1 pr-4 text-d-primary font-medium">
                                        How long does it take to see results?
                                    </h1>
                                    <img
                                        src="/images/home/close-icon.svg"
                                        alt="Toggle FAQ"
                                        className={`faq-icon transition-transform duration-200 ${expandedFaqs['faq2'] ? 'rotate-45' : ''}`}
                                    />
                                </div>
                                <div className={`faq-content px-4 transition-all duration-300 overflow-hidden ${expandedFaqs['faq2'] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <p className="text-d-products text-primary-granite font-normal">
                                        Most users start seeing improvements in hair texture and strength within 4-6 weeks of consistent use. Full results typically appear after 2-3 months of regular application.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </section>
    )
}