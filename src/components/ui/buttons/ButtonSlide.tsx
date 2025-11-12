import React from 'react';
import './ButtonSlide.css';

interface ButtonSlideProps {
  text: string;
  href?: string;
  normalBackground?: string;
  normalColor?: string;
  hoverBackground?: string;
  hoverColor?: string;
  borderColor?: string;
  hoverBorderColor?: string;
  transitionDuration?: string;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
  onClick?: (e: React.MouseEvent) => void;
  target?: string;
}

const ButtonSlide: React.FC<ButtonSlideProps> = ({
  text,
  href = "#",
  normalBackground = "transparent",
  normalColor = "#FAFAFA",
  hoverBackground = "#FAFAFA",
  hoverColor = "#3B3B3B",
  borderColor = "#FAFAFA",
  hoverBorderColor = "#3B3B3B",
  transitionDuration = "0.5s",
  className = "",
  disabled = false,
  type,
  onClick,
  target = "_self"
}) => {
  // Estilos CSS personalizados usando variables CSS
  const styles = React.useMemo(() => ({
    '--normalBg': normalBackground,
    '--normalCol': normalColor,
    '--hoverBg': hoverBackground,
    '--hoverCol': hoverColor,
    '--borderCol': borderColor,
    '--hoverBorderCol': hoverBorderColor,
    '--duration': transitionDuration
  } as React.CSSProperties), [
    normalBackground,
    normalColor,
    hoverBackground,
    hoverColor,
    borderColor,
    hoverBorderColor,
    transitionDuration
  ]);

  // Determinar si className incluye clases de ancho para no aplicar w-fit por defecto
  const hasWidthClass = className && /w-\[|w-full|w-fit|w-auto|w-screen|w-min|w-max|w-1\/|w-\d+/.test(className);
  const baseWidthClass = hasWidthClass ? '' : 'w-fit';

  // Si tiene type, renderizar como botón, sino como enlace
  if (type) {
    return (
      <button 
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`btn-slide text-d-button px-6 py-4 border-[1.5px] rounded-full ${baseWidthClass} text-nowrap ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        style={styles}
      >
        <span>{text}</span>
      </button>
    );
  }

  return (
    <a 
      href={disabled ? undefined : href}
      target={target}
      onClick={onClick}
      className={`btn-slide text-d-button px-8 py-4 border-[1px] ${baseWidthClass} text-nowrap ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''} ${className}`}
      style={styles}
    >
      <span>{text}</span>
    </a>
  );
};

export default ButtonSlide;
