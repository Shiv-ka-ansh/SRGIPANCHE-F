import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import { Link } from 'react-router-dom';

interface MagneticButtonProps {
  children: ReactNode;
  to?: string;
  onClick?: () => void;
  className?: string;
}

export function MagneticButton({ children, to, onClick, className = '' }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.3);
    y.set(middleY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: smoothX, y: smoothY }}
      className={`inline-block ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );

  if (to) {
    return <Link to={to} className="inline-block">{content}</Link>;
  }

  return content;
}
