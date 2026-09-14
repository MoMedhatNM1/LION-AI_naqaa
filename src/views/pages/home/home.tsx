import { useNavigate } from 'react-router-dom';
import { RouteTitle } from '@/router';
import { useAppStore } from '@/store';
import {
  Container,
  Card,
  StatCard,
  Badge,
  ProgressRing,
} from '@/views/components';
import { Hero } from './hero';
import { CompanyCard } from './companyCard';

const statusMap = {
  queued: { label: 'في الانتظار', tone: 'neutral' as const },
  processing: { label: 'قيد المعالجة', tone: 'info' as const },
  ready: { label: 'جاهز', tone: 'success' as const },
  published: { label: 'منشور', tone: 'gold' as const },
};

const taskTone = {
  todo: 'neutral' as const,
  progress: 'info' as const,
  done: 'success' as const,
  delayed: 'error' as const,
};
const taskLabel = {
  todo: 'قيد الانتظار',
  progress: 'قيد التنفيذ',
  done: 'مكتملة',
  delayed: 'متأخرة',
};

export const Home = ({ title }: RouteTitle) => {
  const navigate = useNavigate();
  const { videos, tasks, sentences, notifications } = useAppStore();

  const completion = tasks.length
    ? Math.round(
        (tasks.filter(t => t.status === 'done').length / tasks.length) * 100
      )
    : 0;

  const quickActions = [
    { icon: 'icon-upload', text: 'رفع فيديو', to: '/upload' },
    { icon: 'icon-vector', text: 'اختيار الجمل', to: '/sentence-select' },
    { icon: 'icon-book', text: 'مكتبة الجمل', to: '/sentences' },
    { icon: 'icon-graph', text: 'حالة المصنع', to: '/factory-status' },
  ];

  return (
    <Container>
      <span className="sr-only">{title}</span>
      <Hero />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard
          icon="icon-box"
          label="إجمالي الفيديوهات"
          value={videos.length}
          trend="12%"
          tone="gold"
        />
        <StatCard
          icon="icon-check-circle"
          label="فيديوهات جاهزة"
          value={videos.filter(v => v.status === 'ready' || v.status === 'published').length}
          trend="8%"
          tone="success"
        />
        <StatCard
          icon="icon-book"
          label="مكتبة الجمل"
          value={sentences.length}
          trend="5%"
          tone="info"
        />
        <StatCard
          icon="icon-edit-square"
          label="مهام مفتوحة"
          value={tasks.filter(t => t.status !== 'done').length}
          trend="2"
          trendUp={false}
          tone="warning"
        />
      </div>

      {/* Main grid */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Tasks center */}
        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center gap-2">
              <i className="icon-edit-square text-gold-600" /> مركز المهام
            </h3>
            <button
              onClick={() => navigate('/tasks')}
              className="text-xs font-bold text-gold-600 hover:text-gold-700"
            >
              عرض الكل
            </button>
          </div>
          <div className="flex flex-col items-center gap-5 sm:flex-row">
            <div className="flex shrink-0 flex-col items-center gap-2">
              <ProgressRing value={completion} sublabel="مكتمل" />
              <Badge tone="gold">{tasks.length} مهمة</Badge>
            </div>
            <ul className="flex w-full flex-col gap-2">
              {tasks.slice(0, 4).map(t => (
                <li
                  key={t.id}
                  className="flex items-center gap-3 rounded-2xl bg-white/50 px-3 py-2.5 ring-1 ring-white/60"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl glass-gold text-gold-600">
                    <i className="icon-bookmark" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-ink">
                      {t.title}
                    </p>
                    <p className="text-[11px] text-ink-faint">
                      {t.assignee} · {t.due}
                    </p>
                  </div>
                  <Badge tone={taskTone[t.status]}>{taskLabel[t.status]}</Badge>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        {/* Company + Assistant column */}
        <div className="flex flex-col gap-4">
          <CompanyCard />
        </div>
      </div>

      {/* Factory preview + assistant */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center gap-2">
              <i className="icon-box text-gold-600" /> مصنع الفيديو
            </h3>
            <button
              onClick={() => navigate('/factory')}
              className="text-xs font-bold text-gold-600 hover:text-gold-700"
            >
              عرض الكل
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {videos.slice(0, 4).map(v => (
              <button
                key={v.id}
                onClick={() => navigate('/videos')}
                className="group flex items-center gap-3 rounded-2xl bg-white/50 p-3 text-right ring-1 ring-white/60 transition hover:-translate-y-0.5 hover:shadow-glass"
              >
                <span
                  className={`relative flex h-14 w-20 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tl ${v.accent} text-white shadow`}
                >
                  <i className="icon-box text-2xl opacity-90" />
                  <span className="absolute bottom-1 left-1 rounded bg-black/30 px-1 text-[9px] font-bold">
                    {v.duration}
                  </span>
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-ink">
                    {v.title}
                  </p>
                  <Badge tone={statusMap[v.status].tone} className="mt-1">
                    {statusMap[v.status].label}
                  </Badge>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Smart assistant */}
        <Card variant="gold" className="flex flex-col">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="flex items-center gap-2">
              <i className="icon-vector text-gold-600" /> المساعد الذكي
            </h3>
            <span className="font-display text-xs font-bold text-gold-gradient">
              LION AI
            </span>
          </div>
          <p className="text-sm text-ink-soft">
            كيف يمكنني مساعدتك اليوم؟ اختر إجراءً سريعاً:
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {quickActions.map(a => (
              <button
                key={a.to}
                onClick={() => navigate(a.to)}
                className="flex flex-col items-center gap-1.5 rounded-2xl bg-white/60 py-4 ring-1 ring-white/70 transition hover:-translate-y-0.5 hover:shadow-glass"
              >
                <i className={`${a.icon} text-xl text-gold-600`} />
                <span className="text-xs font-bold text-ink">{a.text}</span>
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Alerts strip */}
      <Card>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="flex items-center gap-2">
            <i className="icon-Info-circle text-gold-600" /> التنبيهات
            <Badge tone="gold">{notifications.length}</Badge>
          </h3>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {notifications.slice(0, 3).map(n => (
            <div
              key={n.id}
              className="flex items-start gap-3 rounded-2xl bg-white/50 p-3 ring-1 ring-white/60"
            >
              <span
                className={`mt-0.5 text-lg ${
                  n.type === 'success'
                    ? 'text-success'
                    : n.type === 'warning'
                    ? 'text-warning'
                    : n.type === 'error'
                    ? 'text-error'
                    : 'text-info'
                }`}
              >
                <i className="icon-Info-circle" />
              </span>
              <div className="min-w-0">
                <p className="text-sm leading-snug text-ink">{n.title}</p>
                <span className="text-[11px] text-ink-faint">{n.time}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </Container>
  );
};
