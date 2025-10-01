import React, { useState, useEffect } from 'react';
import { initCart, cart, isCartDrawerOpen } from '../stores/cart';

const CartIcon: React.FC = () => {
  const [cartData, setCartData] = useState(cart.get());
  const [isHydrated, setIsHydrated] = useState(false);

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
        className="text-sm font-medium text-primary-olive hover:text-primary-granite transition-colors cursor-pointer uppercase"
        onClick={openCart}
      >
        Cart {isHydrated && cartData && `(${cartData.totalQuantity})`}
      </button>
    </div>
  );
};

export default CartIcon;
