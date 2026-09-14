import { ReactNode } from 'react';

interface EmptyStateProps {
  icon: string;
  title: string;
  hint?: string;
  action?: ReactNode;
}

export const EmptyState = ({ icon, title, hint, action }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-silver-300/70 bg-white/40 px-6 py-12 text-center">
    <span className="flex h-14 w-14 items-center justify-center rounded-full glass-gold text-2xl text-gold-600">
      <i className={icon} />
    </span>
    <h4 className="text-ink">{title}</h4>
    {hint && <p className="max-w-sm text-sm text-ink-faint">{hint}</p>}
    {action}
  </div>
);
