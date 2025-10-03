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
            className={`btn-slide text-d-products font-bold px-6 py-4 border-[1.5px] rounded-full w-full text-nowrap disabled:cursor-not-allowed disabled:opacity-60`}
            style={styles}
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
                <span>
                    {variantAvailableForSale ? buttonText : 'SOLD OUT'}
                </span>
            )}
        </button>
    );
};

export default AddToCartButton;
