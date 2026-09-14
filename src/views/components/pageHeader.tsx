import { ReactNode } from 'react';

interface PageHeaderProps {
  icon: string;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

export const PageHeader = ({
  icon,
  title,
  subtitle,
  actions,
}: PageHeaderProps) => (
  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <div className="flex items-center gap-3">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl glass-gold text-xl text-gold-700">
        <i className={icon} />
      </span>
      <div>
        <h2 className="leading-tight">{title}</h2>
        {subtitle && (
          <p className="text-xs text-ink-faint sm:text-sm">{subtitle}</p>
        )}
      </div>
    </div>
    {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
  </div>
);
