'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  variant?: 'default' | 'glass' | 'outline';
}

export function Card({ children, className = '', hover = true, variant = 'default' }: CardProps) {
  const variants = {
    default: 'bg-card border-2 border-transparent hover:border-accent',
    glass: 'glass',
    outline: 'bg-transparent border-2 border-muted hover:border-accent',
  };

  return (
    <motion.div
      whileHover={hover ? { y: -5 } : {}}
      transition={{ duration: 0.3 }}
      className={`
        rounded-3xl overflow-hidden transition-all
        ${variants[variant]}
        ${hover ? 'hover:shadow-xl' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return <div className={`p-6 sm:p-6 ${className}`}>{children}</div>;
}

interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

export function CardBody({ children, className = '' }: CardBodyProps) {
  return <div className={`p-6 sm:p-6 ${className}`}>{children}</div>;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
}

interface CardImageProps {
  src: string;
  alt: string;
  aspectRatio?: 'square' | '4/3' | '16/9' | '21/9';
  className?: string;
}

export function CardImage({ src, alt, aspectRatio = '4/3', className = '' }: CardImageProps) {
  const aspects = {
    square: 'aspect-square',
    '4/3': 'aspect-[4/3]',
    '16/9': 'aspect-[16/9]',
    '21/9': 'aspect-[21/9]',
  };

  return (
    <div className={`relative ${aspects[aspectRatio]} overflow-hidden ${className}`}>
      <motion.img
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.4 }}
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
