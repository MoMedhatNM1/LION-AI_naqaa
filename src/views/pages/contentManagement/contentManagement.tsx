import { useState } from 'react';
import { RouteTitle } from '@/router';
import { useAppStore, ContentItem, ContentStatus } from '@/store';
import {
  Container,
  Card,
  Button,
  Input,
  Select,
  Badge,
  PageHeader,
  StatCard,
  EmptyState,
} from '@/views/components';
import { toast } from '@/toast';
import { contentStatus } from '../shared';

const platforms: ContentItem['platform'][] = [
  'انستغرام',
  'تيك توك',
  'يوتيوب',
  'إكس',
  'سناب شات',
];

const platformIcon: Record<string, string> = {
  انستغرام: 'icon-heart',
  'تيك توك': 'icon-volume-up',
  يوتيوب: 'icon-volume-off',
  إكس: 'icon-share',
  'سناب شات': 'icon-image',
};

const statuses: ContentStatus[] = ['draft', 'scheduled', 'published'];

export const ContentManagement = ({ title }: RouteTitle) => {
  const { content, addContent, setContentStatus, deleteContent } =
    useAppStore();
  const [text, setText] = useState('');
  const [platform, setPlatform] = useState<ContentItem['platform']>('انستغرام');

  const add = () => {
    if (text.trim().length < 3) {
      toast.error('اكتب عنواناً صحيحاً للمحتوى');
      return;
    }
    addContent({
      title: text.trim(),
      platform,
      status: 'draft',
      date: '—',
    });
    setText('');
    toast.success('تمت إضافة عنصر المحتوى');
  };

  const cycle = (item: ContentItem) => {
    const order: ContentStatus[] = ['draft', 'scheduled', 'published'];
    const next = order[(order.indexOf(item.status) + 1) % order.length];
    setContentStatus(item.id, next);
    toast.success(`الحالة: ${contentStatus[next].label}`);
  };

  return (
    <Container>
      <PageHeader
        icon="icon-document"
        title={title ?? 'إدارة المحتوى'}
        subtitle="خطة محتوى نقاء كلين عبر منصات التواصل"
      />

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {statuses.map(s => (
          <StatCard
            key={s}
            icon={
              s === 'published'
                ? 'icon-check-circle'
                : s === 'scheduled'
                ? 'icon-calendar'
                : 'icon-edit'
            }
            label={contentStatus[s].label}
            value={content.filter(c => c.status === s).length}
            tone={s === 'published' ? 'success' : s === 'scheduled' ? 'info' : 'gold'}
          />
        ))}
      </div>

      {/* Add */}
      <Card>
        <h3 className="mb-4 flex items-center gap-2">
          <i className="icon-add-user text-gold-600" /> إضافة محتوى جديد
        </h3>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <Input
            label="عنوان المحتوى"
            placeholder="مثال: ريلز قبل وبعد تنظيف الكنب"
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && add()}
            icon="icon-edit"
          />
          <div className="sm:w-44">
            <Select
              label="المنصة"
              value={platform}
              onChange={e =>
                setPlatform(e.target.value as ContentItem['platform'])
              }
            >
              {platforms.map(p => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </Select>
          </div>
          <Button icon="icon-save" onClick={add} className="shrink-0">
            إضافة
          </Button>
        </div>
      </Card>

      {/* List */}
      <Card>
        <h3 className="mb-4 flex items-center gap-2">
          <i className="icon-document text-gold-600" /> عناصر المحتوى
        </h3>
        {content.length === 0 ? (
          <EmptyState
            icon="icon-document"
            title="لا يوجد محتوى بعد"
            hint="أضف أول عنصر محتوى لخطة نقاء كلين."
          />
        ) : (
          <ul className="flex flex-col gap-2">
            {content.map(c => (
              <li
                key={c.id}
                className="flex flex-col gap-2 rounded-2xl bg-white/50 px-3 py-3 ring-1 ring-white/60 sm:flex-row sm:items-center"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl glass-gold text-gold-600">
                  <i className={platformIcon[c.platform]} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-ink">
                    {c.title}
                  </p>
                  <p className="text-[11px] text-ink-faint">
                    {c.platform} · {c.date}
                  </p>
                </div>
                <button onClick={() => cycle(c)} aria-label="تغيير الحالة">
                  <Badge tone={contentStatus[c.status].tone}>
                    {contentStatus[c.status].label}
                  </Badge>
                </button>
                <button
                  onClick={() => {
                    deleteContent(c.id);
                    toast.success('تم حذف المحتوى');
                  }}
                  aria-label="حذف"
                  className="text-ink-faint transition hover:text-error"
                >
                  <i className="icon-trash" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </Container>
  );
};
