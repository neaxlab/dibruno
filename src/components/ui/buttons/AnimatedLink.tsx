import React from 'react';
import './AnimatedLink.css';

interface AnimatedLinkProps {
  text: string;
  href?: string;
  className?: string;
  lineColor?: string;
  lineHeight?: number;
  linePosition?: number;
  animationDuration?: number;
  target?: string;
  rel?: string;
}

const AnimatedLink: React.FC<AnimatedLinkProps> = ({
  text,
  href = "#",
  className = "",
  lineColor = "currentColor",
  lineHeight = 2,
  linePosition = -8,
  animationDuration = 0.5,
  target,
  rel
}) => {
  const styles = React.useMemo(() => ({
    '--line-color': lineColor,
    '--line-height': `${lineHeight}px`,
    '--line-position': `${linePosition}px`,
    '--animation-duration': `${animationDuration}s`
  } as React.CSSProperties), [lineColor, lineHeight, linePosition, animationDuration]);

  return (
    <a 
      href={href}
      className={`animated-link ${className}`}
      style={styles}
      target={target}
      rel={rel}
    >
      {text}
    </a>
  );
};

export default AnimatedLink;
