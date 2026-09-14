import clsx from 'clsx';
import lionSrc from '@/assets/images/lion.svg';

interface BrandProps {
  collapsed?: boolean;
  className?: string;
}

export const Brand = ({ collapsed = false, className }: BrandProps) => (
  <div className={clsx('flex items-center gap-3', className)}>
    <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl glass-gold shadow-sm">
      <img src={lionSrc} alt="LION AI" className="h-9 w-9" />
    </span>
    {!collapsed && (
      <div className="min-w-0 leading-tight">
        <h3 className="font-display text-lg font-extrabold tracking-wide">
          <span className="text-gold-gradient">LION</span>{' '}
          <span className="text-ink">AI</span>
        </h3>
        <p className="truncate text-[11px] font-medium text-ink-faint">
          نظام إدارة نقاء كلين
        </p>
      </div>
    )}
  </div>
);
