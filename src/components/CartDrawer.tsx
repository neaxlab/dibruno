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

const CartDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [cartData, setCartData] = useState(cart.get());

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
            className="pointer-events-none fixed inset-y-0 right-0 flex max-w-[400px] pl-6 focus:outline-none"
            tabIndex={-1}
            ref={clickOutsideRef}
            onKeyDown={onKeyDown}
          >
            <div className={`pointer-events-auto w-screen max-w-[80vw] md:max-w-lg max-h-screen bg-white border-l border-gray-200 transition-transform duration-500 ease-in-out transform ${
              isAnimating 
                ? 'translate-x-0' 
                : 'translate-x-full'
            }`}>
              <div className="flex flex-col min-h-full max-h-screen">
                <div className="flex items-center justify-between p-5">
                  <h2
                    className="text-2xl flex gap-4 items-center text-black"
                    id="slide-over-title"
                  >
                    <span className="uppercase text-base font-medium">CARRITO</span>
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
                        className="h-6 w-6"
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

                <div className="border-t border-gray-200"></div>

                <div className="flex-1 overflow-y-scroll h-full">
                  <div className="px-6 h-full">
                    {cartData && cartData.lines?.nodes.length > 0 ? (
                      <div
                        className={`space-y-4 ${cartIsUpdatingClass}`}
                      >
                        {cartData.lines.nodes.map((item) => (
                          <div key={item.id} className="flex py-8 gap-6 border-b border-zinc-100 last:border-b-0">
                            <div className="overflow-hidden w-[120px] h-[120px] flex-shrink-0">
                              <img
                                src={item.merchandise.image?.url || ''}
                                alt={item.merchandise.image?.altText || item.merchandise.product.title}
                                className="object-cover object-center w-full h-full"
                              />
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                              <div className="flex gap-2 flex-col">
                                <h3 className="text-black text-xl font-medium leading-6">
                                  {item.merchandise.product.title}
                                </h3>
                                {item.merchandise.title && 
                                 item.merchandise.title !== item.merchandise.product.title && 
                                 item.merchandise.title !== "Default Title" && 
                                 item.merchandise.title !== "Default" && (
                                  <p className="text-sm text-[#666666] font-light">
                                    Variante: {item.merchandise.title}
                                  </p>
                                )}
                                <Money price={item.cost.amountPerQuantity} className="text-sm text-[#949494]" />
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-6 border p-2">
                                  <button
                                    onClick={() => decreaseQuantity(item.id, item.quantity)}
                                    type="button"
                                    disabled={isUpdating}
                                    className="w-2 h-2 flex items-center justify-center disabled:opacity-50 cursor-pointer"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="2" viewBox="0 0 13 2" fill="none">
                                      <path d="M12.3135 1H0.999768" stroke="#4C4C4C" strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="round" />
                                    </svg>
                                  </button>
                                  <span className="text-sm">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => increaseQuantity(item.id, item.quantity)}
                                    type="button"
                                    disabled={isUpdating}
                                    className="w-2 h-2 flex items-center justify-center disabled:opacity-50 cursor-pointer"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                      <path d="M12.6276 7.00012H1.31385M6.9707 1.34326V12.657" stroke="#4C4C4C" strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="round" />
                                    </svg>
                                  </button>
                                </div>
                                <button
                                  onClick={() => removeItem(item.id)}
                                  type="button"
                                  disabled={isUpdating}
                                  className=" disabled:opacity-50 text-sm font-medium underline cursor-pointer"
                                >
                                  Quitar
                                </button>
                              </div>
                            </div>
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
                    <div className="border-t p-6 flex flex-col gap-4">
                      <div className="flex justify-between text-base text-black font-normal">
                        <p>Subtotal</p>
                        <p>
                          <Money
                            price={cartData.cost.subtotalAmount}
                            showCurrency={true}
                          />
                        </p>
                      </div>
                      <div className="w-full text-center border border-black py-3 px-4 font-light">
                        <a href={cartData.checkoutUrl} className="Finalizar compra cursor-pointer">
                          Finalizar compra
                        </a>
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
