import { Children, ClassName } from '@/types';
import clsx from 'clsx';

export const Glass = ({ children, className }: Children & ClassName) => (
  <div
    className={clsx(
      'relative z-0 flex overflow-hidden rounded-primary glass',
      className
    )}
  >
    {children}
  </div>
);
