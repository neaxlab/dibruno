import React, { useState } from 'react';

const AboutSectionMobile = ({ product }) => {
    const [openSections, setOpenSections] = useState({
        about: false,
        ingredients: false,
        howToUse: false,
        benefits: false,
    });
    
    // Debug: verificar beneficios y si trae imagen
    console.log('Benefits metafield (mobile):', product?.benefits);


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
                                src={product.fullImage?.url || product.featuredImage?.url || '/images/placeholder.png'}
                                alt={product.fullImage?.altText || product.featuredImage?.altText || 'Imagen del producto'}
                                className="w-full aspect-square object-cover"
                            />
                        </div>
                        <div className="w-full h-full flex flex-col gap-1 justify-center items-start">
                            <h2 className="text-d-secondary font-light leading-none text-primary-granite">
                                ABOUT THE PRODUCT
                            </h2>
                            <p className="text-d-secondary font-medium leading-[140%] text-primary-olive">
                                {product.fullDescription?.value || product.description || 'Descripción no disponible'}
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
                    {product.activeIngredients?.ingredients?.length > 0 ? product.activeIngredients.ingredients.map((ingredient, idx) => (
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
                                    {ingredient.title}
                                </h2>
                                <p className="text-d-secondary text-primary-granite">
                                    {ingredient.description}
                                </p>
                            </div>
                        </div>
                    )) : (
                        <div className="flex flex-col gap-6 items-center justify-center py-12">
                            <h3 className="text-d-primary font-medium text-primary-granite mb-1">No Ingredients Available</h3>
                            <p className="text-d-secondary text-primary-granite/70 text-center text-sm">
                                Ingredient information is not available at this time.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* How To Use Section */}
            <div className="flex flex-col gap-[50px] border-b border-primary-olive py-5">
                <div 
                    className="flex flex-row items-center justify-between cursor-pointer accordion-trigger" 
                    onClick={() => toggleSection('howToUse')}
                >
                    <h2 className="text-d-primary font-medium leading-none text-primary-olive">
                        How To Use
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
                                src={product.howToUse?.image?.url || product.fullImage?.url || product.featuredImage?.url || '/images/placeholder.png'}
                                alt={product.howToUse?.image?.altText || product.fullImage?.altText || product.featuredImage?.altText || 'Imagen del producto'}
                                className="w-full aspect-square object-cover"
                            />
                        </div>
                        <div className="w-full h-full flex flex-col gap-1 justify-center items-start">
                            <h2 className="text-d-secondary font-light leading-none text-primary-granite">
                                HOW TO USE
                            </h2>
                            {product.howToUse?.steps && product.howToUse.steps.length > 0 ? (
                                <div className="flex flex-col gap-6">
                                    {product.howToUse.steps.map((step, index) => (
                                        <div key={step.id || index} className="flex flex-col gap-3">
                                            <div className="flex flex-row gap-4 items-start">
                                                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                                                    <span className="text-[#D0CFCE] text-[32px] font-semibold leading-[100%] tracking-[0.64px]">
                                                        {step.step_number}
                                                    </span>
                                                </div>
                                                <div className="flex-1">
                                                    {step.step_title && (
                                                        <h3 className="text-[#3B3B3B] text-[20px] font-medium leading-[100%] tracking-[0.4px] mb-2">
                                                            {step.step_title}
                                                        </h3>
                                                    )}
                                                    {step.step_description && (
                                                        <p className="text-[#67645E] font-geist text-[16px] font-normal leading-[140%] tracking-[0.32px]">
                                                            {step.step_description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4 items-center justify-center py-8">
                                    <h3 className="text-d-primary font-medium text-primary-granite mb-1">Usage Instructions Coming Soon</h3>
                                    <p className="text-d-secondary text-primary-granite/70 text-center text-sm">
                                        Detailed usage instructions will be available soon.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="flex flex-col gap-[50px] border-b border-primary-olive py-5">
                <div 
                    className="flex flex-row items-center justify-between cursor-pointer accordion-trigger" 
                    onClick={() => toggleSection('benefits')}
                >
                    <h2 className="text-d-primary font-medium leading-none text-primary-olive">
                        Benefits
                    </h2>
                    <img 
                        src="/images/about/arrow-down.svg" 
                        alt="Arrow Down" 
                        className={`accordion-arrow transition-transform duration-300 ${openSections.benefits ? 'rotate-180' : ''}`}
                    />
                </div>
                <div className={`flex-col gap-10 ${openSections.benefits ? 'flex' : 'hidden'}`}>
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-10 tab-content" data-content="benefits">
                        {product.benefits?.image?.url ? (
                            <div className="w-full h-full justify-center items-center flex">
                                <img
                                    src={product.benefits.image.url}
                                    alt={product.benefits.image.altText || 'Imagen de beneficios'}
                                    className="w-full aspect-square object-cover"
                                />
                            </div>
                        ) : null}
                        <div className="w-full h-full flex flex-col gap-1 justify-center items-start">
                            <h2 className="text-d-secondary font-light leading-none text-primary-granite">
                                BENEFITS
                            </h2>
                            {product.benefits?.items && product.benefits.items.length > 0 ? (
                                <div className="flex flex-col gap-4">
                                    {product.benefits.items.map((b, idx) => (
                                        <div key={b.id || idx} className="flex flex-col gap-1">
                                            {b.title && (
                                                <h3 className="text-[#3B3B3B] text-[18px] font-medium leading-[100%] tracking-[0.36px]">
                                                    {b.title}
                                                </h3>
                                            )}
                                            {b.description && (
                                                <p className="text-[#67645E] font-geist text-[16px] font-normal leading-[140%] tracking-[0.32px]">
                                                    {b.description}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : product.benefits?.content ? (
                                <p className="text-d-secondary font-medium leading-[140%] text-primary-olive">{product.benefits.content}</p>
                            ) : (
                                <div className="flex flex-col gap-4 py-2">
                                    <h3 className="text-d-primary font-medium text-primary-granite mb-1">Benefits Coming Soon</h3>
                                    <p className="text-d-secondary text-primary-granite/70 text-sm">
                                        Benefits information will be available soon.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutSectionMobile;
