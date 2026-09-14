import { useNavigate } from 'react-router-dom';
import { Button } from '@/views/components';
import lionSrc from '@/assets/images/lion.svg';

const bullets = ['إدارة أسهل', 'نتائج أكبر', 'نمو مستمر'];

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden rounded-primary glass-gold p-6 sm:p-8">
      {/* Glow */}
      <span className="pointer-events-none absolute -left-16 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-white/40 blur-3xl" />
      <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="order-2 max-w-xl text-center sm:order-1 sm:text-right">
          <h1 className="font-display text-3xl leading-tight sm:text-4xl">
            مرحباً بك في{' '}
            <span className="text-gold-gradient">LION AI</span>
          </h1>
          <p className="mt-2 text-sm text-ink-soft sm:text-base">
            كل شيء تحت السيطرة .. نظام إدارة نقاء كلين بعقلٍ أذكى.
          </p>
          <p className="mt-3 font-display text-sm font-bold text-gold-700">
            « الأفكار العظيمة .. تبدأ بعقلٍ أعظم »
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            {bullets.map(b => (
              <span
                key={b}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/60 px-3 py-1.5 text-xs font-bold text-ink-soft ring-1 ring-white/70"
              >
                <i className="icon-check-circle text-success" />
                {b}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            <Button icon="icon-box" onClick={() => navigate('/factory')}>
              مصنع فيديوهات نقاء
            </Button>
            <Button
              variant="ghost"
              icon="icon-category"
              onClick={() => navigate('/overview')}
            >
              نظرة عامة على نقاء
            </Button>
          </div>
        </div>

        {/* Lion visual */}
        <div className="relative order-1 shrink-0 sm:order-2">
          <span className="absolute inset-0 animate-pulse-soft rounded-full bg-gold-200/50 blur-2xl" />
          <div className="relative flex h-40 w-40 animate-float items-center justify-center rounded-full glass shadow-glass-lg sm:h-48 sm:w-48">
            <img
              src={lionSrc}
              alt="LION AI"
              className="h-32 w-32 sm:h-40 sm:w-40"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
