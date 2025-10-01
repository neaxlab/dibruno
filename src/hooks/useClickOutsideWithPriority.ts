import { useEffect, useRef } from 'react';

export function useClickOutsideWithPriority<T extends HTMLElement>(
  callback: () => void,
  priority: number = 0
): React.RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        // Verificar si hay otros drawers abiertos con mayor prioridad
        const cartDrawer = document.querySelector('[data-drawer="cart"]');
        const productDrawer = document.querySelector('[data-drawer="product"]');
        
        // Si hay un drawer con mayor prioridad abierto, no cerrar este
        if (priority === 0 && productDrawer) {
          return; // Cart drawer tiene prioridad 0, no cerrar si product drawer está abierto
        }
        if (priority === 1 && cartDrawer) {
          return; // Product drawer tiene prioridad 1, no cerrar si cart drawer está abierto
        }
        
        callback();
      }
    }

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [callback, priority]);

  return ref;
}
