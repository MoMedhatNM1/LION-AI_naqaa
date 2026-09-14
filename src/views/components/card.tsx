import { HTMLAttributes, ReactNode, forwardRef } from 'react';
import clsx from 'clsx';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
  /** glass = frosted white, gold = warm gold tint, soft = lighter glass */
  variant?: 'glass' | 'gold' | 'soft';
  /** subtle hover lift */
  hover?: boolean;
  padded?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { children, className, variant = 'glass', hover = false, padded = true, ...props },
    ref
  ) => (
    <div
      ref={ref}
      className={clsx(
        'rounded-primary',
        {
          glass: variant === 'glass',
          'glass-gold': variant === 'gold',
          'glass-soft': variant === 'soft',
        },
        padded && 'p-4 sm:p-5',
        hover &&
          'transition-all duration-300 hover:-translate-y-1 hover:shadow-glass-lg',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

Card.displayName = 'Card';
