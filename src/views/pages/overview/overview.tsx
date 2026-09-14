import { useNavigate } from 'react-router-dom';
import { RouteTitle } from '@/router';
import { useAppStore } from '@/store';
import {
  Container,
  Card,
  StatCard,
  Badge,
  Button,
  PageHeader,
  ProgressRing,
} from '@/views/components';
import naqaaSrc from '@/assets/images/naqaa.svg';

const services = [
  { icon: 'icon-home', name: 'تنظيف المنازل' },
  { icon: 'icon-case', name: 'تنظيف المكاتب' },
  { icon: 'icon-star', name: 'تنظيف المفروشات' },
  { icon: 'icon-refresh', name: 'تنظيف السجاد بالبخار' },
];

const socials = [
  { icon: 'icon-heart', name: 'انستغرام', value: '182.4K', trend: '+12%' },
  { icon: 'icon-volume-up', name: 'تيك توك', value: '96.7K', trend: '+28%' },
  { icon: 'icon-volume-off', name: 'يوتيوب', value: '24.1K', trend: '+19%' },
  { icon: 'icon-share', name: 'إكس', value: '18.9K', trend: '+7%' },
];

export const Overview = ({ title }: RouteTitle) => {
  const navigate = useNavigate();
  const { brand, videos, tasks } = useAppStore();

  const completion = tasks.length
    ? Math.round(
        (tasks.filter(t => t.status === 'done').length / tasks.length) * 100
      )
    : 0;

  return (
    <Container>
      <PageHeader
        icon="icon-category"
        title={title ?? 'نظرة عامة على نقاء'}
        subtitle="ملف شركة نقاء كلين داخل نظام LION AI"
        actions={
          <Button icon="icon-box" onClick={() => navigate('/factory')}>
            مصنع الفيديو
          </Button>
        }
      />

      {/* Company banner */}
      <Card variant="gold" className="relative overflow-hidden">
        <span className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/40 blur-3xl" />
        <div className="relative flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex h-20 w-20 items-center justify-center rounded-3xl glass shadow-sm">
              <img src={naqaaSrc} alt="نقاء كلين" className="h-14 w-14" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2>نقاء كلين</h2>
                <Badge tone="success" dot>
                  نشطة
                </Badge>
              </div>
              <p className="text-sm text-ink-soft">NAQAA CLEAN</p>
              <p className="mt-1 text-xs text-ink-faint">{brand.tagline}</p>
              <a
                href={`https://${brand.website}`}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-gold-700 hover:underline"
              >
                <i className="icon-link" />
                {brand.website}
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ProgressRing value={completion} size={104} sublabel="إنجاز المهام" />
          </div>
        </div>
      </Card>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard icon="icon-box" label="إجمالي الفيديوهات" value={videos.length} trend="12%" tone="gold" />
        <StatCard icon="icon-users" label="إجمالي المتابعين" value="354.7K" trend="16%" tone="info" />
        <StatCard icon="icon-chart" label="متوسط المشاهدات" value="42.3K" trend="9%" tone="success" />
        <StatCard icon="icon-star" label="رضا العملاء" value="4.9" hint="من 5" tone="warning" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Services */}
        <Card className="lg:col-span-2">
          <h3 className="mb-4 flex items-center gap-2">
            <i className="icon-bag text-gold-600" /> خدمات نقاء كلين
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {services.map(s => (
              <div
                key={s.name}
                className="flex items-center gap-3 rounded-2xl bg-white/50 p-3 ring-1 ring-white/60"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl glass-gold text-lg text-gold-600">
                  <i className={s.icon} />
                </span>
                <p className="text-sm font-bold text-ink">{s.name}</p>
                <Badge tone="success" className="mr-auto">
                  متاحة
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Social */}
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center gap-2">
              <i className="icon-share text-gold-600" /> مواقع التواصل
            </h3>
            <button
              onClick={() => navigate('/content')}
              className="text-xs font-bold text-gold-600 hover:text-gold-700"
            >
              المحتوى
            </button>
          </div>
          <ul className="flex flex-col gap-2">
            {socials.map(s => (
              <li
                key={s.name}
                className="flex items-center gap-3 rounded-2xl bg-white/50 px-3 py-2.5 ring-1 ring-white/60"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl glass-gold text-gold-600">
                  <i className={s.icon} />
                </span>
                <span className="flex-1 text-sm font-bold text-ink">
                  {s.name}
                </span>
                <span className="font-display text-sm font-extrabold text-ink">
                  {s.value}
                </span>
                <Badge tone="success">{s.trend}</Badge>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Container>
  );
};
