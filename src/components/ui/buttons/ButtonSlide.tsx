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
  className = ""
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

  return (
    <a 
      href={href}
      className={`btn-slide text-d-button px-6 py-4 border-[1.5px] rounded-full w-fit text-nowrap ${className}`}
      style={styles}
    >
      <span>{text}</span>
    </a>
  );
};

export default ButtonSlide;
