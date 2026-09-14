import { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  className?: string;
  variant?: 'gold' | 'ghost' | 'glass' | 'danger';
  size?: 'sm' | 'md';
  icon?: string;
}

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  gold: 'bg-gradient-to-tl from-gold-600 via-gold-400 to-gold-300 text-white shadow-gold hover:shadow-[0_14px_36px_-10px_rgba(193,149,54,0.6)] hover:brightness-105',
  ghost:
    'bg-white/60 text-ink-soft ring-1 ring-white/70 hover:bg-white hover:text-ink',
  glass:
    'glass-soft text-ink-soft hover:text-ink hover:shadow-glass',
  danger:
    'bg-error/90 text-white shadow-[0_10px_30px_-10px_rgba(209,91,88,0.5)] hover:brightness-105',
};

const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
};

export const Button = ({
  children,
  className,
  variant = 'gold',
  size = 'md',
  icon,
  ...props
}: ButtonProps) => (
  <button
    className={clsx(
      'inline-flex h-fit min-w-fit items-center justify-center gap-2 whitespace-nowrap rounded-full text-center font-bold outline-none transition-all duration-300',
      'disabled:cursor-not-allowed disabled:from-silver-300 disabled:via-silver-200 disabled:to-silver-200 disabled:bg-silver-200 disabled:text-ink-faint disabled:shadow-none disabled:brightness-100 disabled:ring-0',
      variants[variant],
      sizes[size],
      className
    )}
    {...props}
  >
    {icon && <i className={clsx(icon, 'text-lg')} />}
    {children}
  </button>
);
