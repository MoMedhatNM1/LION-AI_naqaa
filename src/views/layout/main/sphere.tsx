import { ClassName } from '@/types';
import clsx from 'clsx';

interface SphereProps extends ClassName {
  variant: 'primary' | 'secondary';
}

export const Sphere = ({ className, variant }: SphereProps) => (
  <span
    className={clsx(
      'pointer-events-none absolute -z-20 rounded-full blur-2xl',
      {
        'h-[180px] w-[180px] bg-gold-200/50': variant === 'primary',
        'h-[150px] w-[150px] bg-sky-200/50': variant === 'secondary',
      },
      className
    )}
  />
);
