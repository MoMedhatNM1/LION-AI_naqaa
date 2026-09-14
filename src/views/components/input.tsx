import { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import clsx from 'clsx';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegisterReturn<string>;
  className?: string;
  label?: string;
  errorMsg?: string;
  icon?: string;
}

export const Input = ({
  register,
  className,
  label,
  errorMsg,
  icon,
  ...props
}: InputProps) => {
  return (
    <div className="flex w-full flex-col gap-1">
      {label && (
        <label className="mr-1 text-xs font-bold text-ink-soft">{label}</label>
      )}
      <div className="relative flex items-center">
        {Boolean(icon) && (
          <i
            className={clsx(
              'pointer-events-none absolute right-4 text-xl text-ink-faint',
              icon
            )}
          />
        )}
        <input
          className={clsx(
            'w-full rounded-2xl bg-white/70 px-4 py-2.5 text-ink outline-none ring-1 backdrop-blur transition-shadow placeholder:text-ink-faint autofill:shadow-[inset_0_0_0_1000px_#fff]',
            {
              'pr-[46px]': Boolean(icon),
              'ring-error/70': Boolean(errorMsg),
              'ring-silver-300/70 focus:ring-gold-400': !errorMsg,
            },
            className
          )}
          {...register}
          {...props}
        />
      </div>
      {Boolean(errorMsg) && (
        <span className="mr-1 text-xs text-error">{errorMsg}</span>
      )}
    </div>
  );
};
