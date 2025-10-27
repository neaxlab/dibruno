import React, { useState, useEffect } from 'react';
import { initCart, cart, isCartDrawerOpen } from '@/stores/cart';

interface CartIconProps {
  isScrolled?: boolean;
}

const CartIcon: React.FC<CartIconProps> = ({ isScrolled = false }) => {
  const [cartData, setCartData] = useState(cart.get());
  const [isHydrated, setIsHydrated] = useState(false);
  
  // Detectar si estamos en la ruta product
  const isShopRoute = typeof window !== 'undefined' && window.location.pathname.startsWith('/product');

  useEffect(() => {
    initCart();
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    const unsubscribe = cart.subscribe(setCartData);
    return unsubscribe;
  }, []);

  const openCart = () => {
    isCartDrawerOpen.set(true);
  };

  return (
    <div>
      <button 
        className={`cart-button text-d-nav hover:text-primary-granite transition-colors cursor-pointer ${
          isShopRoute 
            ? (isScrolled ? 'text-primary-olive' : 'text-primary-lotion')
            : 'text-primary-olive'
        }`}
        onClick={openCart}
      >
        Cart {isHydrated && cartData && `(${cartData.totalQuantity})`}
      </button>
    </div>
  );
};

export default CartIcon;
