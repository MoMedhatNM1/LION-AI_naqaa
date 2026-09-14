import {
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
  ReactNode,
} from 'react';
import clsx from 'clsx';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  className?: string;
}

export const Textarea = ({ label, className, ...props }: TextareaProps) => (
  <div className="flex w-full flex-col gap-1">
    {label && (
      <label className="mr-1 text-xs font-bold text-ink-soft">{label}</label>
    )}
    <textarea
      className={clsx(
        'w-full resize-none rounded-2xl bg-white/70 px-4 py-2.5 text-ink outline-none ring-1 ring-silver-300/70 backdrop-blur transition-shadow placeholder:text-ink-faint focus:ring-gold-400',
        className
      )}
      {...props}
    />
  </div>
);

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  className?: string;
  children: ReactNode;
}

export const Select = ({
  label,
  className,
  children,
  ...props
}: SelectProps) => (
  <div className="flex w-full flex-col gap-1">
    {label && (
      <label className="mr-1 text-xs font-bold text-ink-soft">{label}</label>
    )}
    <select
      className={clsx(
        'w-full appearance-none rounded-2xl bg-white/70 px-4 py-2.5 text-ink outline-none ring-1 ring-silver-300/70 backdrop-blur transition-shadow focus:ring-gold-400',
        className
      )}
      {...props}
    >
      {children}
    </select>
  </div>
);
