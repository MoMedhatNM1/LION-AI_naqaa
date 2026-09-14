import { Children } from '@/types';
import clsx from 'clsx';

interface ContainerProps extends Children {
  className?: string;
}

export const Container = ({ children, className }: ContainerProps) => (
  <section
    className={clsx(
      'no-scrollbar relative h-full animate-fade-up overflow-y-auto pb-2 pl-1',
      className
    )}
    role="content"
  >
    <div className="flex flex-col gap-4 sm:gap-5">{children}</div>
  </section>
);
