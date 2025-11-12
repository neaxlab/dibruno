import React, { useState, useEffect } from 'react';
import { addCartItem, cart } from '@/stores/cart';
import './AddToCartButton.css';

interface Props {
    variantId: string;
    variantQuantityAvailable: number;
    variantAvailableForSale: boolean;
    iconOnly?: boolean;
    buttonText?: string;
}

const AddToCartButton: React.FC<Props> = ({
    variantId,
    variantQuantityAvailable,
    variantAvailableForSale,
    iconOnly = false,
    buttonText = 'Add to Cart',
}) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [cartData, setCartData] = useState(cart.get());
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        // Solo obtener datos del carrito después de la hidratación
        setCartData(cart.get());
        setIsHydrated(true);
        
        const unsubscribe = cart.subscribe(setCartData);
        return unsubscribe;
    }, []);

    const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (isUpdating) {
            return;
        }

        if (isDisabled) {
            return;
        }

        setIsUpdating(true);

        try {
            const item = {
                id: variantId,
                quantity: 1,
            };

            await addCartItem(item);
        } catch (error) {
            console.error('Error adding item to cart:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    // Durante la hidratación, usar solo los props para evitar inconsistencias
    const isDisabled = isHydrated 
        ? (isUpdating || !variantAvailableForSale)
        : (!variantAvailableForSale);

    // Estilos CSS personalizados usando variables CSS (igual que ButtonSlide)
    const styles = React.useMemo(() => ({
        '--normalBg': 'transparent',
        '--normalCol': '#3B3B3B',
        '--hoverBg': '#3B3B3B',
        '--hoverCol': '#FAFAFA',
        '--borderCol': '#3B3B3B',
        '--hoverBorderCol': '#FAFAFA',
        '--duration': '0.5s'
    } as React.CSSProperties), []);

    return (
        <button
            onClick={handleAddToCart}
            className={`btn-slide text-d-products font-bold isabled:cursor-not-allowed disabled:opacity-60`}
            // style={styles}
            disabled={isDisabled}
        >
            {isUpdating ? (
                <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            ) : (
                <div className="flex flex-row items-center gap-2 px-4 py-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <g clipPath="url(#clip0_2214_23011)">
                                <mask id="mask0_2214_23011" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                <path d="M24 0H0V24H24V0Z" fill="white"/>
                                </mask>
                                <g mask="url(#mask0_2214_23011)">
                                <path d="M7.5 7.66952V6.69952C7.5 4.44952 9.31 2.23952 11.56 2.02952C14.24 1.76952 16.5 3.87952 16.5 6.50952V7.88952" stroke="black" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M8.99983 22H14.9998C19.0198 22 19.7398 20.39 19.9498 18.43L20.6998 12.43C20.9698 9.99 20.2698 8 15.9998 8H7.99983C3.72983 8 3.02983 9.99 3.29983 12.43L4.04983 18.43C4.25983 20.39 4.97983 22 8.99983 22Z" stroke="black" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M15.4951 12H15.5041" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M8.49414 12H8.50312" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </g>
                            </g>
                            <defs>
                                <clipPath id="clip0_2214_23011">
                                <rect width="24" height="24" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                        <p className="text-[14px] font-light leading-[140%] tracking-[-0.56px]">Add to bag</p>
                        
                    </div>
            )}
        </button>
    );
};

export default AddToCartButton;
