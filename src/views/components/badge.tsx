import { ReactNode } from 'react';
import clsx from 'clsx';

export type BadgeTone =
  | 'gold'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral';

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  icon?: string;
  className?: string;
  dot?: boolean;
}

const tones: Record<BadgeTone, string> = {
  gold: 'bg-gold-100/70 text-gold-700 ring-gold-300/50',
  success: 'bg-success/10 text-success ring-success/25',
  warning: 'bg-warning/10 text-warning ring-warning/30',
  error: 'bg-error/10 text-error ring-error/25',
  info: 'bg-info/10 text-info ring-info/25',
  neutral: 'bg-silver-100 text-ink-soft ring-silver-300/60',
};

const dotColor: Record<BadgeTone, string> = {
  gold: 'bg-gold-500',
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
  info: 'bg-info',
  neutral: 'bg-silver-500',
};

export const Badge = ({
  children,
  tone = 'neutral',
  icon,
  className,
  dot = false,
}: BadgeProps) => (
  <span
    className={clsx(
      'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold ring-1',
      tones[tone],
      className
    )}
  >
    {dot && (
      <span className={clsx('h-1.5 w-1.5 rounded-full', dotColor[tone])} />
    )}
    {icon && <i className={icon} />}
    {children}
  </span>
);
