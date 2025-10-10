'use client';

import { motion } from 'framer-motion';
import { ReactNode, ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'font-semibold rounded-full transition-all inline-flex items-center justify-center gap-2';

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 hover:shadow-lg',
    secondary: 'bg-secondary text-foreground hover:bg-secondary/80',
    outline:
      'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white',
    ghost: 'bg-transparent text-foreground hover:bg-muted',
    gold: 'gold-gradient text-primary hover:shadow-xl hover:shadow-accent/30',
  };

  const sizes = {
    sm: 'px-5 py-3 text-base sm:px-4 sm:py-2 sm:text-sm min-h-[44px]',
    md: 'px-6 py-4 text-base sm:py-3 min-h-[48px]',
    lg: 'px-8 py-5 text-lg sm:py-4 min-h-[52px]',
  };

  const isDisabled = disabled || isLoading;

  return (
    <motion.button
      whileHover={!isDisabled ? { scale: 1.05 } : {}}
      whileTap={!isDisabled ? { scale: 0.95 } : {}}
      disabled={isDisabled}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...(props as any)}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!isLoading && leftIcon && leftIcon}
      {children}
      {!isLoading && rightIcon && rightIcon}
    </motion.button>
  );
}

// Link variant
import Link from 'next/link';

interface ButtonLinkProps {
  href: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
  className?: string;
  external?: boolean;
}

export function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  children,
  className = '',
  external = false,
}: ButtonLinkProps) {
  const baseStyles =
    'font-semibold rounded-full transition-all inline-flex items-center justify-center gap-2';

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 hover:shadow-lg',
    secondary: 'bg-secondary text-foreground hover:bg-secondary/80',
    outline:
      'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white',
    ghost: 'bg-transparent text-foreground hover:bg-muted',
    gold: 'gold-gradient text-primary hover:shadow-xl hover:shadow-accent/30',
  };

  const sizes = {
    sm: 'px-5 py-3 text-base sm:px-4 sm:py-2 sm:text-sm min-h-[44px]',
    md: 'px-6 py-4 text-base sm:py-3 min-h-[48px]',
    lg: 'px-8 py-5 text-lg sm:py-4 min-h-[52px]',
  };

  const Component = motion(external ? 'a' : Link);

  return (
    <Component
      href={href}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      {leftIcon && leftIcon}
      {children}
      {rightIcon && rightIcon}
    </Component>
  );
}
