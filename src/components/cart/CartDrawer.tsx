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

  const hasItems = !!(cartData && cartData.lines?.nodes.length);

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
        setTimeout(() => setIsAnimating(true), 10);
      } else {
        setIsAnimating(false);
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
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-in fade-in duration-500" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="pointer-events-none fixed inset-y-0 right-0 flex pl-6 focus:outline-none"
            tabIndex={-1}
            ref={clickOutsideRef}
            onKeyDown={onKeyDown}
          >
            <div className={`pointer-events-auto w-screen sm:min-w-[350px] min-w-[320px] sm:max-w-[35dvw] max-w-[90vw] max-h-screen bg-white transition-transform duration-500 ease-in-out transform ${isAnimating
              ? 'translate-x-0'
              : 'translate-x-full'
              }`}>
              <div className="flex flex-col min-h-full max-h-screen bg-primary-bright">
                <div className="flex items-center justify-between p-4 sm:p-5 border-b-[0.5px] border-[#BABABA]">
                  <h2
                    className="text-[20px] sm:text-[24px] font-normal flex gap-2 sm:gap-4 items-center text-black"
                    id="slide-over-title"
                  >
                    <span className="text-[20px] sm:text-[24px] font-normal">Cart ({cartData?.totalQuantity})</span>
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
                        className="h-8 w-8 hover:rotate-90 transition-all duration-300"
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
                  <div className="min-h-full flex flex-col">
                    {cartData && cartData.lines?.nodes.length > 0 ? (
                      <div
                        className={`gap-10 ${cartIsUpdatingClass}`}
                      >
                        {cartData.lines.nodes.map((item) => (
                          <div key={item.id} className="flex py-6 sm:py-8 px-4 sm:px-6 gap-4 sm:gap-6 flex-row justify-between items-start border-b-[0.5px] border-[#BABABA]">
                            <div className="flex items-center gap-4 sm:gap-6 flex-row">
                              <div className="overflow-hidden w-[100px] sm:w-[136px] h-[100px] sm:h-[136px] flex-shrink-0 rounded-2xl sm:rounded-3xl">
                                <img
                                  src={item.merchandise.image?.url || ''}
                                  alt={item.merchandise.image?.altText || item.merchandise.product.title}
                                  className="object-cover object-center w-full h-full"
                                />
                              </div>
                              <div className="flex-1 flex flex-col justify-between items-start gap-4 sm:gap-6">
                                <div className="flex flex-col gap-2">
                                  <h3 className="!text-[16px] sm:!text-[18px] font-medium text-d-secondary">
                                    {item.merchandise.product.title}
                                  </h3>
                                  <Money price={item.cost.amountPerQuantity} className="text-primary-olive !text-[16px] sm:!text-[18px] font-light text-d-secondary" />
                                </div>
                                <div className="flex items-center justify-between w-full">
                                  <div className="flex items-center gap-4 sm:gap-6 p-2 rounded-full border-[0.5px] border-[#67645E]">
                                    <button
                                      onClick={() => decreaseQuantity(item.id, item.quantity)}
                                      type="button"
                                      disabled={isUpdating}
                                      className=" flex items-center justify-center disabled:opacity-50 cursor-pointer rounded-full text-primary-granite"
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 14 3" fill="none">
                                        <path d="M12.3332 1.5H1.6665" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                      </svg>
                                    </button>
                                    <span className="text-d-secondary text-primary-granite">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() => increaseQuantity(item.id, item.quantity)}
                                      type="button"
                                      disabled={isUpdating || item.quantity >= 99}
                                      className={` flex items-center justify-center disabled:opacity-50 cursor-pointer rounded-full ${item.quantity >= 99 ? 'text-[#D0CFCE]' : ' text-primary-granite'}`}
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 14 13" fill="none">
                                        <path d="M6.99984 1.1665V11.8332M12.3332 6.49984H1.6665" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                      </svg>
                                    </button>
                                  </div>
                                  <button
                                    onClick={() => removeItem(item.id)}
                                    type="button"
                                    disabled={isUpdating}
                                    className="text-[#717171] text-[14px] sm:text-[16px] font-light leading-[100%] tracking-[0.32px]"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>

                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col gap-4 justify-center items-center flex-1 min-h-[400px]">
                        <p className="text-[#949494] text-[20px] sm:text-[24px] font-semibold leading-normal tracking-[0.48px] capitalize">Your Cart is Empty</p>
                        <button
                          type="button"
                          onClick={() => { window.location.href = '/shop'; }}
                          className="w-full justify-center items-center flex text-[#3B3B3B] text-[14px] sm:text-[16px] font-semibold leading-normal tracking-[0.32px] underline decoration-solid capitalize"
                        >
                          Browse products
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="p-4 sm:p-6 flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <p className="text-[#3B3B3B] text-[20px] sm:text-[24px] font-medium leading-[120%] tracking-[0.48px]">Subtotal</p>
                      <p>
                        <Money
                          price={cartData && cartData.lines?.nodes.length ? cartData.cost.subtotalAmount : { amount: '0.00', currencyCode: (cartData?.cost?.subtotalAmount?.currencyCode || 'USD') as string }}
                          showCurrency={true}
                          className="text-[#3B3B3B] text-[20px] sm:text-[24px] font-medium leading-[120%] tracking-[0.48px]"
                        />
                      </p>

                    </div>
                    <div className="text-xs sm:text-d-tertiary font-light w-full text-primary-granite">
                      Shipping, taxes and discounts calculated at checkout
                    </div>
                    <div className="w-full flex items-center gap-4">
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="terms-checkbox"
                          className="relative size-6 cursor-pointer appearance-none rounded-[4px] bg-white border-2 border-primary-olive checked:bg-primary-olive checked:border-primary-olive focus:outline-none focus:ring-2 focus:ring-primary-olive/20 disabled:opacity-50 disabled:cursor-not-allowed"
                          checked={termsAccepted}
                          disabled={!hasItems}
                          onChange={handleTermsChange}
                        />
                        {termsAccepted && (
                          <svg
                            className="absolute top-3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[22px] h-[22px] pointer-events-none"
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                          >
                            <path d="M4.58203 12.833L7.79036 16.0413L17.4154 5.95801" stroke="#FEFEFE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                        )}
                      </div>
                      <label htmlFor="terms-checkbox" className="text-[#3B3B3B] text-[14px] sm:text-[16px] font-light leading-[120%] tracking-[0.32px]">I agree to the <a href="/terms-of-service" className="text-primary-olive underline">Terms and Policies</a></label>
                    </div>
                    <ButtonSlide
                      text={`SHOP NOW`}
                      href={cartData?.checkoutUrl || '/shop'}
                      normalBackground="transparent"
                      normalColor="#3B3B3B"
                      hoverBackground="#3B3B3B"
                      hoverColor="#FAFAFA"
                      borderColor="#3B3B3B"
                      hoverBorderColor="#FAFAFA"
                      transitionDuration="0.5s"
                      className="w-full justify-center items-center flex sm:mt-6 mt-3"
                      disabled={!termsAccepted || !hasItems}
                    />
                  </div>
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
