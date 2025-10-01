import React, { useState, useEffect, useRef } from 'react';
import {
  cart,
  isCartDrawerOpen,
  removeCartItems,
  updateCartItemQuantity,
  isCartUpdating,
} from '../stores/cart';
import Money from './Money';
import { useClickOutsideWithPriority } from '../hooks/useClickOutsideWithPriority';
import ButtonSlide from './ui/buttons/ButtonSlide';

const CartDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [cartData, setCartData] = useState(cart.get());
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    const unsubscribe = cart.subscribe(setCartData);
    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = isCartUpdating.subscribe(setIsUpdating);
    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = isCartDrawerOpen.subscribe((open) => {
      if (open) {
        setIsOpen(true);
        // Pequeño delay para permitir que el DOM se actualice antes de la animación
        setTimeout(() => setIsAnimating(true), 10);
      } else {
        setIsAnimating(false);
        // Esperar a que termine la animación de salida antes de ocultar
        setTimeout(() => setIsOpen(false), 500);
      }
    });
    return unsubscribe;
  }, []);

  const removeItem = (id: string) => {
    removeCartItems([id]);
  };

  const increaseQuantity = (id: string, currentQuantity: number) => {
    updateCartItemQuantity(id, currentQuantity + 1);
  };

  const decreaseQuantity = (id: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateCartItemQuantity(id, currentQuantity - 1);
    } else {
      removeCartItems([id]);
    }
  };

  const closeCartDrawer = () => {
    document.querySelector('body')?.classList.remove('overflow-hidden');
    isCartDrawerOpen.set(false);
  };

  const clickOutsideRef = useClickOutsideWithPriority<HTMLDivElement>(closeCartDrawer, 0);

  useEffect(() => {
    if (isOpen) {
      document.querySelector('body')?.classList.add('overflow-hidden');
      clickOutsideRef.current?.focus();
    } else {
      document.querySelector('body')?.classList.remove('overflow-hidden');
    }

    return () => {
      document.querySelector('body')?.classList.remove('overflow-hidden');
    };
  }, [isOpen, clickOutsideRef]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeCartDrawer();
    }
  };

  const handleTermsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAccepted(event.target.checked);
  };

  const cartIsUpdatingClass = isUpdating
    ? 'opacity-50 pointer-events-none'
    : '';

  if (!isOpen) return null;

  return (
    <div
      className="relative z-[60]"
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
      data-drawer="cart"
    >
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-in fade-in duration-500 md:hidden" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="pointer-events-none fixed inset-y-0 right-0 flex pl-6 focus:outline-none"
            tabIndex={-1}
            ref={clickOutsideRef}
            onKeyDown={onKeyDown}
          >
            <div className={`pointer-events-auto w-screen max-w-[50vw] max-h-screen bg-white transition-transform duration-500 ease-in-out transform ${isAnimating
                ? 'translate-x-0'
                : 'translate-x-full'
              }`}>
              <div className="flex flex-col min-h-full max-h-screen bg-primary-bright">
                <div className="flex items-center justify-between p-5">
                  <h2
                    className="text-2xl flex gap-4 items-center text-black"
                    id="slide-over-title"
                  >
                    <span className="text-d-title-1">Cart ({cartData?.totalQuantity})</span>
                    {isUpdating && (
                      <svg
                        className="animate-spin -ml-1 mr-3 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    )}
                  </h2>
                  <div className="flex h-7 items-center">
                    <button
                      onClick={closeCartDrawer}
                      type="button"
                      className="-m-2 p-2 text-black hover:text-gray-500"
                    >
                      <span className="sr-only">Cerrar panel</span>
                      <svg
                        className="h-11 w-11 hover:rotate-90 transition-all duration-300"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>


                <div className="flex-1 overflow-y-scroll h-full">
                  <div className="px-6 h-full">
                    {cartData && cartData.lines?.nodes.length > 0 ? (
                      <div
                        className={`gap-10 ${cartIsUpdatingClass}`}
                      >
                        {cartData.lines.nodes.map((item) => (
                          <div key={item.id} className="flex py-8 gap-6 flex-row justify-between items-start">
                            <div className="flex items-center gap-6 flex-row">
                              <div className="overflow-hidden w-[136px] h-[136px] flex-shrink-0 rounded-3xl">
                                <img
                                  src={item.merchandise.image?.url || ''}
                                  alt={item.merchandise.image?.altText || item.merchandise.product.title}
                                  className="object-cover object-center w-full h-full"
                                />
                              </div>
                              <div className="flex-1 flex flex-col justify-between items-start gap-6">
                                <div className="flex flex-col gap-2">
                                  <h3 className="text-d-products">
                                    {item.merchandise.product.title}
                                  </h3>
                                  <Money price={item.cost.amountPerQuantity} className="text-primary-olive text-d-products" />
                                </div>
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-6 p-2 rounded-full border border-primary-granite">
                                    <button
                                      onClick={() => decreaseQuantity(item.id, item.quantity)}
                                      type="button"
                                      disabled={isUpdating}
                                      className="size-8 flex items-center justify-center disabled:opacity-50 cursor-pointer"
                                    >
                                      <img src="images/home/minus.svg" alt="Minus" className="size-8" />
                                    </button>
                                    <span className="text-d-secondary text-primary-granite">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() => increaseQuantity(item.id, item.quantity)}
                                      type="button"
                                      disabled={isUpdating || item.quantity >= 99}
                                      className="size-8 flex items-center justify-center disabled:opacity-50 cursor-pointer"
                                    >
                                      <img src="images/home/plus.svg" alt="Plus" className="size-8" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              type="button"
                              disabled={isUpdating}
                              className=" disabled:opacity-50 w-fit text-sm font-medium underline cursor-pointer"
                            >
                              <img src="images/home/delete.svg" alt="Trash" className="size-8" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col gap-4 justify-center items-center h-full">
                        <p className="text-gray-500">Tu carrito está vacío</p>
                        <div className="w-full text-center py-3 px-4 border">
                          <a
                            href="/shop"
                            className="font-semibold text-black hover:text-gray-500"
                          >
                            Continuar comprando
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  {cartData && cartData.lines?.nodes.length > 0 && (
                    <div className="p-6 flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <p className="text-d-title-2">Subtotal</p>
                        <p>
                          <Money
                            price={cartData.cost.subtotalAmount}
                            showCurrency={true}
                            className="text-d-title-2"
                          />
                        </p>
                        
                      </div>
                      <div className="w-full flex items-center gap-4">
                          <div className="relative">
                            <input 
                              type="checkbox" 
                              id="terms-checkbox"
                              className="relative size-6 cursor-pointer appearance-none rounded-[4px] bg-white border-2 border-primary-olive checked:bg-primary-olive checked:border-primary-olive focus:outline-none focus:ring-2 focus:ring-primary-olive/20" 
                              checked={termsAccepted}
                              onChange={handleTermsChange}
                            />
                            {termsAccepted && (
                              <svg 
                                className="absolute top-3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-primary-lotion pointer-events-none"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path 
                                  fillRule="evenodd" 
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                          <label htmlFor="terms-checkbox" className="text-d-products font-light">I agree to the <a href="/terms-of-service" className="text-primary-olive underline">Terms and Policies</a></label>
                        </div>
                        <ButtonSlide
                          text={`SHOP NOW`}
                          href={cartData.checkoutUrl}
                          normalBackground="transparent"
                          normalColor="#3B3B3B"
                          hoverBackground="#3B3B3B"
                          hoverColor="#FAFAFA"
                          borderColor="#3B3B3B"
                          hoverBorderColor="#FAFAFA"
                          transitionDuration="0.5s"
                          className="w-full justify-center items-center sm:flex hidden mt-6"
                          disabled={!termsAccepted}
                        /> 
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
