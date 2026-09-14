import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store';
import { Card, Badge } from '@/views/components';
import naqaaSrc from '@/assets/images/naqaa.svg';

export const CompanyCard = () => {
  const navigate = useNavigate();
  const { videos, tasks, sentences } = useAppStore();

  const contentCount = videos.length;
  const completion = tasks.length
    ? Math.round(
        (tasks.filter(t => t.status === 'done').length / tasks.length) * 100
      )
    : 0;

  const stats = [
    { icon: 'icon-box', label: 'فيديو', value: contentCount },
    { icon: 'icon-book', label: 'جملة', value: sentences.length },
    { icon: 'icon-check-circle', label: 'مكتمل', value: `${completion}%` },
  ];

  return (
    <Card hover className="relative overflow-hidden">
      <span className="pointer-events-none absolute -left-8 -top-8 h-28 w-28 rounded-full bg-gold-200/40 blur-2xl" />
      <div className="relative flex items-center gap-4">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl glass-gold">
          <img src={naqaaSrc} alt="نقاء كلين" className="h-11 w-11" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate">نقاء كلين</h3>
            <Badge tone="success" dot>
              نشطة
            </Badge>
          </div>
          <p className="text-xs text-ink-faint">NAQAA CLEAN · الشركة الوحيدة</p>
        </div>
        <div className="text-left">
          <span className="font-display text-xl font-extrabold text-success">
            +24%
          </span>
          <p className="text-[11px] text-ink-faint">نمو هذا الشهر</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {stats.map(s => (
          <div
            key={s.label}
            className="flex flex-col items-center gap-1 rounded-2xl bg-white/50 py-3 ring-1 ring-white/60"
          >
            <i className={`${s.icon} text-lg text-gold-600`} />
            <span className="font-display text-base font-extrabold text-ink">
              {s.value}
            </span>
            <span className="text-[11px] text-ink-faint">{s.label}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate('/overview')}
        className="mt-4 w-full rounded-full bg-gradient-to-tl from-gold-600 via-gold-400 to-gold-300 py-2.5 text-sm font-bold text-white shadow-gold transition hover:brightness-105"
      >
        إدارة الشركة
      </button>
    </Card>
  );
};
