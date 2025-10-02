import React, { useState } from 'react';

const AboutSectionMobile = ({ product }) => {
    const [openSections, setOpenSections] = useState({
        about: false,
        ingredients: false,
        howToUse: false
    });

    const toggleSection = (section) => {
        setOpenSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };


    return (
        <div className="w-full p-5">
            {/* About Section */}
            <div className="flex flex-col gap-[50px] border-b border-primary-olive py-5">
                <div 
                    className="flex flex-row items-center justify-between cursor-pointer accordion-trigger" 
                    onClick={() => toggleSection('about')}
                >
                    <h2 className="text-d-primary font-medium leading-none text-primary-olive">
                        About
                    </h2>
                    <img 
                        src="/images/about/arrow-down.svg" 
                        alt="Arrow Down" 
                        className={`accordion-arrow transition-transform duration-300 ${openSections.about ? 'rotate-180' : ''}`}
                    />
                </div>
                <div className={`flex-col gap-10 ${openSections.about ? 'flex' : 'hidden'}`}>
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-10 tab-content" data-content="about">
                        <div className="w-full h-full justify-center items-center flex">
                            <img
                                src={product.full_image.url}
                                alt={product.full_image.altText}
                                className="w-full aspect-square object-cover"
                            />
                        </div>
                        <div className="w-full h-full flex flex-col gap-1 justify-center items-start">
                            <h2 className="text-d-secondary font-light leading-none text-primary-granite">
                                ABOUT THE PRODUCT
                            </h2>
                            <p className="text-d-secondary font-medium leading-[140%] text-primary-olive">
                                {product.full_description.value}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ingredients Section */}
            <div className="flex flex-col gap-[50px] border-b border-primary-olive py-5">
                <div 
                    className="flex flex-row items-center justify-between cursor-pointer accordion-trigger" 
                    onClick={() => toggleSection('ingredients')}
                >
                    <h2 className="text-d-primary font-medium leading-none text-primary-olive">
                        Ingredients
                    </h2>
                    <img 
                        src="/images/about/arrow-down.svg" 
                        alt="Arrow Down" 
                        className={`accordion-arrow transition-transform duration-300 ${openSections.ingredients ? 'rotate-180' : ''}`}
                    />
                </div>
                <div className={`flex-col gap-8 ${openSections.ingredients ? 'flex' : 'hidden'}`}>
                    {product.active_ingredients.images.map((ingredient, idx) => (
                        <div key={idx} className="flex flex-col gap-10 items-start">
                            <div className="w-fit h-fit">
                                <img
                                    src={ingredient.url}
                                    alt={ingredient.altText}
                                    className="w-full max-w-[253px] h-full max-h-[138px] object-cover"
                                />
                            </div>
                            <div className="w-full h-full flex flex-col gap-1 justify-center items-start">
                                <h2 className="text-d-primary text-primary-olive">
                                    {ingredient.name}
                                </h2>
                                <p className="text-d-secondary text-primary-granite">
                                    {ingredient.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* How to Use Section */}
            <div className="flex flex-col gap-[50px] border-b border-primary-olive py-5">
                <div 
                    className="flex flex-row items-center justify-between cursor-pointer accordion-trigger" 
                    onClick={() => toggleSection('howToUse')}
                >
                    <h2 className="text-d-primary font-medium leading-none text-primary-olive">
                        How to use
                    </h2>
                    <img 
                        src="/images/about/arrow-down.svg" 
                        alt="Arrow Down" 
                        className={`accordion-arrow transition-transform duration-300 ${openSections.howToUse ? 'rotate-180' : ''}`}
                    />
                </div>
                <div className={`flex-col gap-10 ${openSections.howToUse ? 'flex' : 'hidden'}`}>
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-10 tab-content" data-content="about">
                        <div className="w-full h-full justify-center items-center flex">
                            <img
                                src={product.full_image.url}
                                alt={product.full_image.altText}
                                className="w-full aspect-square object-cover"
                            />
                        </div>
                        <div className="w-full h-full flex flex-col gap-1 justify-center items-start">
                            <p className="text-d-secondary leading-[140%] text-primary-granite">
                                {product.how_to_use.value}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutSectionMobile;
