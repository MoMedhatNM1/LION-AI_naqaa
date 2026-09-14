import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouteTitle } from '@/router';
import { useAppStore, SentenceCategory } from '@/store';
import {
  Container,
  Card,
  Button,
  Input,
  Badge,
  PageHeader,
} from '@/views/components';
import { toast } from '@/toast';

const categories: (SentenceCategory | 'الكل')[] = [
  'الكل',
  'ترحيب',
  'خدمات',
  'عروض',
  'جودة',
  'ختام',
];

export const SentenceSelect = ({ title }: RouteTitle) => {
  const navigate = useNavigate();
  const { sentences, autoSelectSentences, createVideo } = useAppStore();
  const [mode, setMode] = useState<'auto' | 'manual'>('auto');
  const [videoTitle, setVideoTitle] = useState('');
  const [category, setCategory] = useState<SentenceCategory | 'الكل'>('الكل');
  const [count, setCount] = useState(3);
  const [autoSelected, setAutoSelected] = useState<string[]>(() =>
    autoSelectSentences(3)
  );
  const [manualSelected, setManualSelected] = useState<string[]>([]);

  const filtered = useMemo(
    () =>
      category === 'الكل'
        ? sentences
        : sentences.filter(s => s.category === category),
    [sentences, category]
  );

  const regenerate = () => {
    setAutoSelected(
      autoSelectSentences(count, category === 'الكل' ? undefined : category)
    );
    toast.success('تم توليد مجموعة جديدة من الجمل');
  };

  const toggleManual = (id: string) =>
    setManualSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );

  const selectedIds = mode === 'auto' ? autoSelected : manualSelected;
  const byId = (id: string) => sentences.find(s => s.id === id);

  const submit = () => {
    if (selectedIds.length === 0) {
      toast.error('اختر جملة واحدة على الأقل');
      return;
    }
    createVideo({
      title: videoTitle.trim() || 'فيديو نقاء كلين',
      fileName: 'naqaa-video.mp4',
      duration: `00:${(10 + selectedIds.length * 4).toString().padStart(2, '0')}`,
      sentences: selectedIds,
    });
    toast.success('تم إرسال الفيديو إلى المصنع');
    navigate('/factory');
  };

  return (
    <Container>
      <PageHeader
        icon="icon-vector"
        title={title ?? 'اختيار الجمل'}
        subtitle="اختر جمل الفيديو تلقائياً بذكاء LION AI أو يدوياً"
        actions={
          <div className="flex rounded-full bg-white/60 p-1 ring-1 ring-silver-300/60">
            {(['auto', 'manual'] as const).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
                  mode === m
                    ? 'bg-gradient-to-tl from-gold-600 to-gold-300 text-white shadow'
                    : 'text-ink-soft'
                }`}
              >
                {m === 'auto' ? 'تلقائي' : 'يدوي'}
              </button>
            ))}
          </div>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          {/* Category filter */}
          <Card>
            <div className="flex flex-wrap items-center gap-2">
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                    category === c
                      ? 'glass-gold text-gold-700'
                      : 'bg-white/50 text-ink-soft ring-1 ring-white/60 hover:text-ink'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </Card>

          {mode === 'auto' ? (
            <Card>
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="flex items-center gap-2">
                  <i className="icon-vector text-gold-600" /> الجمل المختارة تلقائياً
                </h3>
                <div className="flex items-center gap-3">
                  <label className="text-xs font-bold text-ink-soft">
                    العدد: {count}
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={6}
                    value={count}
                    onChange={e => setCount(Number(e.target.value))}
                    className="w-28 accent-gold-500"
                  />
                  <Button size="sm" variant="ghost" icon="icon-refresh" onClick={regenerate}>
                    توليد
                  </Button>
                </div>
              </div>
              <ul className="flex flex-col gap-2">
                {autoSelected.map((id, i) => (
                  <li
                    key={id}
                    className="flex items-center gap-3 rounded-2xl bg-white/50 px-3 py-3 ring-1 ring-white/60"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-tl from-gold-600 to-gold-300 text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <p className="flex-1 text-sm text-ink">{byId(id)?.text}</p>
                    <Badge tone="gold">{byId(id)?.category}</Badge>
                  </li>
                ))}
                {autoSelected.length === 0 && (
                  <p className="py-6 text-center text-sm text-ink-faint">
                    اضغط "توليد" لاختيار الجمل
                  </p>
                )}
              </ul>
            </Card>
          ) : (
            <Card>
              <h3 className="mb-4 flex items-center gap-2">
                <i className="icon-edit-square text-gold-600" /> اختر الجمل يدوياً
              </h3>
              <ul className="flex flex-col gap-2">
                {filtered.map(s => {
                  const active = manualSelected.includes(s.id);
                  return (
                    <li key={s.id}>
                      <button
                        onClick={() => toggleManual(s.id)}
                        className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-right ring-1 transition ${
                          active
                            ? 'glass-gold ring-gold-300'
                            : 'bg-white/50 ring-white/60 hover:bg-white/70'
                        }`}
                      >
                        <span
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 transition ${
                            active
                              ? 'border-gold-500 bg-gold-500 text-white'
                              : 'border-silver-300'
                          }`}
                        >
                          {active && <i className="icon-check-circle text-xs" />}
                        </span>
                        <p className="flex-1 text-sm text-ink">{s.text}</p>
                        <Badge tone="neutral">{s.category}</Badge>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </Card>
          )}
        </div>

        {/* Summary */}
        <Card variant="gold" className="flex h-fit flex-col gap-4">
          <h3 className="flex items-center gap-2">
            <i className="icon-box text-gold-600" /> ملخص الفيديو
          </h3>
          <Input
            label="عنوان الفيديو"
            placeholder="عنوان الفيديو"
            value={videoTitle}
            onChange={e => setVideoTitle(e.target.value)}
            icon="icon-edit"
          />
          <div className="rounded-2xl bg-white/60 p-4 ring-1 ring-white/70">
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-soft">عدد الجمل</span>
              <span className="font-display text-xl font-extrabold text-gold-700">
                {selectedIds.length}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-ink-soft">الوضع</span>
              <Badge tone="gold">{mode === 'auto' ? 'تلقائي' : 'يدوي'}</Badge>
            </div>
          </div>
          <Button icon="icon-send" className="w-full" onClick={submit}>
            إرسال إلى المصنع
          </Button>
          <Button
            variant="ghost"
            icon="icon-book"
            className="w-full"
            onClick={() => navigate('/sentences')}
          >
            إدارة مكتبة الجمل
          </Button>
        </Card>
      </div>
    </Container>
  );
};
