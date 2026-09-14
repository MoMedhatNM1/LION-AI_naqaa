import { useNavigate } from 'react-router-dom';
import { RouteTitle } from '@/router';
import { useAppStore, VideoStatus } from '@/store';
import {
  Container,
  Card,
  Badge,
  Button,
  PageHeader,
} from '@/views/components';
import { toast } from '@/toast';
import { videoStatus } from '../shared';

const nextStatus: Partial<Record<VideoStatus, VideoStatus>> = {
  queued: 'processing',
  processing: 'ready',
  ready: 'published',
};
const nextLabel: Partial<Record<VideoStatus, string>> = {
  queued: 'بدء المعالجة',
  processing: 'وضع كجاهز',
  ready: 'نشر',
};

export const Factory = ({ title }: RouteTitle) => {
  const navigate = useNavigate();
  const { videos, advanceVideo, sentences } = useAppStore();

  const stages: { key: VideoStatus; icon: string }[] = [
    { key: 'queued', icon: 'icon-calendar' },
    { key: 'processing', icon: 'icon-loading' },
    { key: 'ready', icon: 'icon-check-circle' },
    { key: 'published', icon: 'icon-send' },
  ];

  const advance = (id: string, status: VideoStatus, title: string) => {
    const to = nextStatus[status];
    if (!to) return;
    advanceVideo(id, to);
    toast.success(`"${title}" → ${videoStatus[to].label}`);
  };

  return (
    <Container>
      <PageHeader
        icon="icon-box"
        title={title ?? 'مصنع فيديوهات نقاء'}
        subtitle="خط إنتاج فيديوهات نقاء كلين — من الرفع حتى النشر"
        actions={
          <>
            <Button icon="icon-upload" onClick={() => navigate('/upload')}>
              إنشاء فيديو جديد
            </Button>
            <Button
              variant="ghost"
              icon="icon-graph"
              onClick={() => navigate('/factory-status')}
            >
              حالة المصنع
            </Button>
          </>
        }
      />

      {/* Pipeline stages */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stages.map(s => (
          <Card key={s.key} variant="soft" hover className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl glass-gold text-xl text-gold-600">
              <i className={s.icon} />
            </span>
            <div>
              <p className="font-display text-2xl font-extrabold text-ink">
                {videos.filter(v => v.status === s.key).length}
              </p>
              <p className="text-xs text-ink-faint">
                {videoStatus[s.key].label}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Production line */}
      <Card>
        <h3 className="mb-4 flex items-center gap-2">
          <i className="icon-box text-gold-600" /> خط الإنتاج الحالي
        </h3>
        <div className="flex flex-col gap-3">
          {videos.map(v => (
            <div
              key={v.id}
              className="flex flex-col gap-3 rounded-2xl bg-white/50 p-3 ring-1 ring-white/60 sm:flex-row sm:items-center"
            >
              <span
                className={`relative flex h-16 w-24 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tl ${v.accent} text-white shadow`}
              >
                <i className="icon-box text-2xl opacity-90" />
                <span className="absolute bottom-1 left-1 rounded bg-black/30 px-1 text-[9px] font-bold">
                  {v.duration}
                </span>
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-bold text-ink">
                    {v.title}
                  </p>
                  <Badge tone={videoStatus[v.status].tone}>
                    {videoStatus[v.status].label}
                  </Badge>
                </div>
                <p className="mt-0.5 text-[11px] text-ink-faint">
                  {v.fileName} · {v.sentences.length} جملة
                </p>
                {v.status === 'processing' && (
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-silver-200">
                    <div
                      className="h-full rounded-full bg-gradient-to-l from-gold-600 to-gold-300 transition-all"
                      style={{ width: `${v.progress}%` }}
                    />
                  </div>
                )}
              </div>
              {nextStatus[v.status] && (
                <Button
                  size="sm"
                  variant={v.status === 'ready' ? 'gold' : 'ghost'}
                  onClick={() => advance(v.id, v.status, v.title)}
                  className="shrink-0"
                >
                  {nextLabel[v.status]}
                </Button>
              )}
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-ink-faint">
          إجمالي {sentences.length} جملة متاحة في المكتبة لتغذية المصنع
        </p>
      </Card>
    </Container>
  );
};
