import React, { useState, useEffect } from 'react';
import {
  cart,
  isCartDrawerOpen,
  removeCartItems,
  updateCartItemQuantity,
  isCartUpdating,
} from '@/stores/cart';
import Money from './Money';
import { useClickOutsideWithPriority } from '@/hooks/useClickOutsideWithPriority';
import ButtonSlide from '@/components/ui/buttons/ButtonSlide';

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
    if (cartData?.lines?.nodes) {
      cartData.lines.nodes.forEach((line, index) => {
      });
    }
  }, [cartData]);

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
            <div className={`pointer-events-auto w-screen sm:max-w-[50vw] max-h-screen bg-white transition-transform duration-500 ease-in-out transform ${isAnimating
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


                <div className="flex-1 overflow-y-auto hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  <div className="px-6 min-h-full flex flex-col">
                    {cartData && cartData.lines?.nodes.length > 0 ? (
                      <div
                        className={`gap-10 ${cartIsUpdatingClass}`}
                      >
                        {cartData.lines.nodes.map((item) => (
                          <div key={item.id} className="flex py-8 gap-6 flex-row justify-between items-start ">
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
                                  <h3 className="sm:text-d-products text-d-secondary">
                                    {item.merchandise.product.title}
                                  </h3>
                                  <Money price={item.cost.amountPerQuantity} className="text-primary-olive sm:text-d-products text-d-secondary" />
                                </div>
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-6 p-2 rounded-full border border-primary-granite">
                                    <button
                                      onClick={() => decreaseQuantity(item.id, item.quantity)}
                                      type="button"
                                      disabled={isUpdating}
                                      className="w-[26px] h-[26px] flex items-center justify-center disabled:opacity-50 cursor-pointer bg-primary-granite rounded-full"
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 14 3" fill="none">
                                        <path d="M12.3332 1.5H1.6665" stroke="#FAFAFA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                      </svg>
                                    </button>
                                    <span className="text-d-secondary text-primary-granite">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() => increaseQuantity(item.id, item.quantity)}
                                      type="button"
                                      disabled={isUpdating || item.quantity >= 99}
                                      className={`w-[26px] h-[26px] flex items-center justify-center disabled:opacity-50 cursor-pointer rounded-full ${item.quantity >= 99 ? 'bg-[#D0CFCE]' : 'bg-primary-granite'}`}
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 14 13" fill="none">
                                        <path d="M6.99984 1.1665V11.8332M12.3332 6.49984H1.6665" stroke="#FAFAFA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                      </svg>
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
                              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <path d="M26 7.3335L25.1737 20.7003C24.9625 24.1154 24.8571 25.823 24.0011 27.0507C23.5777 27.6576 23.0329 28.1699 22.4009 28.5548C21.1228 29.3335 19.412 29.3335 15.9903 29.3335C12.5642 29.3335 10.8511 29.3335 9.57207 28.5534C8.93973 28.1678 8.39467 27.6546 7.97157 27.0466C7.11584 25.817 7.0126 24.107 6.80615 20.6871L6 7.3335" stroke="#3B3B3B" stroke-width="2" stroke-linecap="round" />
                                <path d="M4 7.33317H28M21.4076 7.33317L20.4975 5.45548C19.8928 4.20818 19.5904 3.58453 19.0689 3.19558C18.9533 3.1093 18.8308 3.03256 18.7027 2.9661C18.1252 2.6665 17.4321 2.6665 16.046 2.6665C14.6251 2.6665 13.9147 2.6665 13.3276 2.97866C13.1975 3.04785 13.0733 3.1277 12.9564 3.2174C12.4289 3.6221 12.1342 4.26857 11.5448 5.56152L10.7372 7.33317" stroke="#3B3B3B" stroke-width="2" stroke-linecap="round" />
                                <path d="M12.667 22V14" stroke="#3B3B3B" stroke-width="2" stroke-linecap="round" />
                                <path d="M19.333 22V14" stroke="#3B3B3B" stroke-width="2" stroke-linecap="round" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col gap-4 justify-center items-center flex-1 min-h-[400px]">
                        <p className="sm:text-d-title-2 text-d-secondary text-2xl text-primary-granite">Your Cart is Empty</p>
                        <ButtonSlide
                          text={`BROWSER PRODUCTS`}
                          href="/shop"
                          normalBackground="transparent"
                          normalColor="#3B3B3B"
                          hoverBackground="#3B3B3B"
                          hoverColor="#FAFAFA"
                          borderColor="#3B3B3B"
                          hoverBorderColor="#FAFAFA"
                          transitionDuration="0.5s"
                          className="w-full justify-center items-center flex"
                          disabled={!termsAccepted}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  {cartData && cartData.lines?.nodes.length > 0 && (
                    <div className="p-6 flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <p className="sm:text-d-title-2 text-d-secondary text-2xl">Subtotal</p>
                        <p>
                          <Money
                            price={cartData.cost.subtotalAmount}
                            showCurrency={true}
                            className="sm:text-d-title-2 text-d-secondary text-2xl"
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
                        <label htmlFor="terms-checkbox" className="sm:text-d-products text-d-tertiary font-light">I agree to the <a href="/terms-of-service" className="text-primary-olive underline">Terms and Policies</a></label>
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
                        className="w-full justify-center items-center flex sm:mt-6 mt-3"
                        disabled={!termsAccepted}
                      />
                      <div className="text-xs sm:text-d-tertiary font-light w-full text-primary-granite">
                        *Shipping, taxes and discounts calculated at checkout
                      </div>
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
