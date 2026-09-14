import { Card } from '.';
import clsx from 'clsx';

interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  hint?: string;
  trend?: string;
  trendUp?: boolean;
  tone?: 'gold' | 'info' | 'success' | 'warning';
  className?: string;
}

const iconTones = {
  gold: 'from-gold-400 to-gold-600 text-white',
  info: 'from-info to-sky-600 text-white',
  success: 'from-success to-emerald-600 text-white',
  warning: 'from-warning to-amber-600 text-white',
};

export const StatCard = ({
  icon,
  label,
  value,
  hint,
  trend,
  trendUp = true,
  tone = 'gold',
  className,
}: StatCardProps) => (
  <Card variant="soft" hover className={clsx('flex items-center gap-4', className)}>
    <div
      className={clsx(
        'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tl text-xl shadow-sm',
        iconTones[tone]
      )}
    >
      <i className={icon} />
    </div>
    <div className="min-w-0 flex-1">
      <p className="truncate text-xs font-medium text-ink-faint">{label}</p>
      <div className="flex items-end gap-2">
        <span className="font-display text-2xl font-extrabold leading-tight text-ink">
          {value}
        </span>
        {trend && (
          <span
            className={clsx(
              'mb-1 inline-flex items-center gap-0.5 text-xs font-bold',
              trendUp ? 'text-success' : 'text-error'
            )}
          >
            <i className={trendUp ? 'icon-up' : 'icon-down'} />
            {trend}
          </span>
        )}
      </div>
      {hint && <p className="truncate text-[11px] text-ink-faint">{hint}</p>}
    </div>
  </Card>
);
