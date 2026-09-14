import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouteTitle } from '@/router';
import { useAppStore, VideoStatus } from '@/store';
import {
  Container,
  Card,
  Button,
  Badge,
  PageHeader,
  EmptyState,
} from '@/views/components';
import { toast } from '@/toast';
import { videoStatus } from '../shared';

const filters: (VideoStatus | 'all')[] = [
  'all',
  'queued',
  'processing',
  'ready',
  'published',
];
const filterLabel: Record<string, string> = {
  all: 'الكل',
  queued: 'في الانتظار',
  processing: 'قيد المعالجة',
  ready: 'جاهز',
  published: 'منشور',
};

export const PreviousVideos = ({ title }: RouteTitle) => {
  const navigate = useNavigate();
  const { videos, deleteVideo, sentences } = useAppStore();
  const [filter, setFilter] = useState<VideoStatus | 'all'>('all');

  const list = useMemo(
    () => (filter === 'all' ? videos : videos.filter(v => v.status === filter)),
    [videos, filter]
  );

  const sentencePreview = (ids: string[]) =>
    ids
      .map(id => sentences.find(s => s.id === id)?.text)
      .filter(Boolean)
      .slice(0, 1)[0] ?? '—';

  return (
    <Container>
      <PageHeader
        icon="icon-folder"
        title={title ?? 'الفيديوهات السابقة'}
        subtitle="أرشيف فيديوهات نقاء كلين المنتجة"
        actions={
          <Button icon="icon-upload" onClick={() => navigate('/upload')}>
            فيديو جديد
          </Button>
        }
      />

      <Card padded={false} className="p-3">
        <div className="flex flex-wrap items-center gap-2">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                filter === f
                  ? 'glass-gold text-gold-700'
                  : 'bg-white/50 text-ink-soft ring-1 ring-white/60 hover:text-ink'
              }`}
            >
              {filterLabel[f]}
            </button>
          ))}
        </div>
      </Card>

      {list.length === 0 ? (
        <EmptyState
          icon="icon-folder"
          title="لا توجد فيديوهات"
          hint="ابدأ بإنشاء فيديو جديد من صفحة رفع الفيديو."
          action={
            <Button icon="icon-upload" onClick={() => navigate('/upload')}>
              رفع فيديو
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map(v => (
            <Card key={v.id} hover padded={false} className="overflow-hidden">
              <div
                className={`relative flex h-32 items-center justify-center bg-gradient-to-tl ${v.accent} text-white`}
              >
                <i className="icon-box text-4xl opacity-90" />
                <span className="absolute bottom-2 left-2 rounded bg-black/30 px-1.5 py-0.5 text-[10px] font-bold">
                  {v.duration}
                </span>
                <span className="absolute right-2 top-2">
                  <Badge tone={videoStatus[v.status].tone}>
                    {videoStatus[v.status].label}
                  </Badge>
                </span>
              </div>
              <div className="p-4">
                <h4 className="truncate text-ink">{v.title}</h4>
                <p className="mt-1 truncate text-xs text-ink-faint">
                  {v.fileName}
                </p>
                <p className="mt-2 line-clamp-2 rounded-xl bg-white/50 px-2.5 py-2 text-xs text-ink-soft ring-1 ring-white/60">
                  « {sentencePreview(v.sentences)} »
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[11px] text-ink-faint">
                    {v.sentences.length} جملة
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toast.success('تشغيل المعاينة')}
                      aria-label="تشغيل"
                      className="flex h-8 w-8 items-center justify-center rounded-full glass-soft text-gold-600 transition hover:shadow-glass"
                    >
                      <i className="icon-right" />
                    </button>
                    <button
                      onClick={() => {
                        deleteVideo(v.id);
                        toast.success('تم حذف الفيديو');
                      }}
                      aria-label="حذف"
                      className="flex h-8 w-8 items-center justify-center rounded-full glass-soft text-ink-faint transition hover:text-error"
                    >
                      <i className="icon-trash" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
};
