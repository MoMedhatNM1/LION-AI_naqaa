import clsx from 'clsx';

interface ToggleProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  label?: string;
  id?: string;
}

export const Toggle = ({ checked, onChange, label, id }: ToggleProps) => (
  <label
    htmlFor={id}
    className="inline-flex cursor-pointer items-center gap-2 select-none"
  >
    <button
      type="button"
      id={id}
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={clsx(
        'relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300',
        checked
          ? 'bg-gradient-to-l from-gold-600 to-gold-400'
          : 'bg-silver-300'
      )}
    >
      <span
        className={clsx(
          'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-300',
          checked ? 'right-0.5' : 'right-[22px]'
        )}
      />
    </button>
    {label && <span className="text-sm text-ink-soft">{label}</span>}
  </label>
);
