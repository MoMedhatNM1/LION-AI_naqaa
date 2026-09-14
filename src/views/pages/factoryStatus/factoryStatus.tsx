import { RouteTitle } from '@/router';
import { useAppStore } from '@/store';
import {
  Container,
  Card,
  Badge,
  StatCard,
  PageHeader,
  ProgressRing,
} from '@/views/components';
import { videoStatus } from '../shared';

const gauges = [
  { label: 'وحدة المعالجة', value: 42, tone: 'from-gold-400 to-gold-600' },
  { label: 'التخزين', value: 68, tone: 'from-info to-sky-600' },
  { label: 'الذاكرة', value: 55, tone: 'from-success to-emerald-600' },
];

export const FactoryStatus = ({ title }: RouteTitle) => {
  const { videos } = useAppStore();

  const processing = videos.filter(v => v.status === 'processing').length;
  const queued = videos.filter(v => v.status === 'queued').length;
  const done = videos.filter(
    v => v.status === 'ready' || v.status === 'published'
  ).length;
  const health = 98;

  return (
    <Container>
      <PageHeader
        icon="icon-graph"
        title={title ?? 'حالة المصنع'}
        subtitle="مراقبة أداء مصنع فيديوهات نقاء في الوقت الحقيقي"
        actions={
          <Badge tone="success" dot>
            المصنع يعمل بكفاءة
          </Badge>
        }
      />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard icon="icon-loading" label="قيد المعالجة" value={processing} tone="info" />
        <StatCard icon="icon-calendar" label="في الطابور" value={queued} tone="warning" />
        <StatCard icon="icon-check-circle" label="مكتمل" value={done} tone="success" />
        <StatCard icon="icon-refresh" label="متوسط الإنتاج" value="4.2د" hint="لكل فيديو" tone="gold" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Health */}
        <Card className="flex flex-col items-center justify-center gap-3 text-center">
          <ProgressRing value={health} size={140} sublabel="صحة المصنع" />
          <Badge tone="success" dot>
            جميع الأنظمة تعمل
          </Badge>
          <p className="text-xs text-ink-faint">
            آخر فحص للنظام قبل دقيقتين
          </p>
        </Card>

        {/* Resource gauges */}
        <Card className="lg:col-span-2">
          <h3 className="mb-4 flex items-center gap-2">
            <i className="icon-chart text-gold-600" /> استهلاك الموارد
          </h3>
          <div className="flex flex-col gap-4">
            {gauges.map(g => (
              <div key={g.label}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-bold text-ink">{g.label}</span>
                  <span className="text-ink-faint">{g.value}%</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-silver-200">
                  <div
                    className={`h-full rounded-full bg-gradient-to-l ${g.tone} transition-all duration-700`}
                    style={{ width: `${g.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <h3 className="mb-3 mt-6 flex items-center gap-2">
            <i className="icon-loading text-gold-600" /> المهام النشطة الآن
          </h3>
          <div className="flex flex-col gap-2">
            {videos
              .filter(v => v.status === 'processing' || v.status === 'queued')
              .map(v => (
                <div
                  key={v.id}
                  className="flex items-center gap-3 rounded-2xl bg-white/50 px-3 py-2.5 ring-1 ring-white/60"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl glass-gold text-gold-600">
                    <i
                      className={
                        v.status === 'processing'
                          ? 'icon-loading animate-spin'
                          : 'icon-calendar'
                      }
                    />
                  </span>
                  <span className="flex-1 truncate text-sm font-bold text-ink">
                    {v.title}
                  </span>
                  <Badge tone={videoStatus[v.status].tone}>
                    {videoStatus[v.status].label}
                  </Badge>
                </div>
              ))}
          </div>
        </Card>
      </div>
    </Container>
  );
};
