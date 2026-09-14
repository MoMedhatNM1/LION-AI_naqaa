import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouteTitle } from '@/router';
import { useAppStore } from '@/store';
import {
  Container,
  Card,
  Button,
  Input,
  Badge,
  PageHeader,
  EmptyState,
} from '@/views/components';
import { toast } from '@/toast';

const randomDuration = () => {
  const s = 12 + Math.floor(Math.random() * 40);
  return `00:${s.toString().padStart(2, '0')}`;
};

export const Upload = ({ title }: RouteTitle) => {
  const navigate = useNavigate();
  const { autoSelectSentences, createVideo } = useAppStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [count, setCount] = useState(3);
  const [dragOver, setDragOver] = useState(false);

  const pickFile = (name?: string) => {
    if (!name) return;
    setFileName(name);
    if (!videoTitle) setVideoTitle(name.replace(/\.[^.]+$/, ''));
  };

  const handleAuto = () => {
    const finalTitle = videoTitle.trim() || 'فيديو نقاء كلين';
    const selected = autoSelectSentences(count);
    createVideo({
      title: finalTitle,
      fileName: fileName || 'naqaa-video.mp4',
      duration: randomDuration(),
      sentences: selected,
    });
    toast.success('تم إرسال الفيديو إلى المصنع مع اختيار الجمل تلقائياً');
    navigate('/factory');
  };

  return (
    <Container>
      <PageHeader
        icon="icon-upload"
        title={title ?? 'رفع الفيديو'}
        subtitle="ارفع فيديو نقاء كلين وابدأ خط الإنتاج"
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Dropzone */}
        <Card className="lg:col-span-2">
          <label
            onDragOver={e => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => {
              e.preventDefault();
              setDragOver(false);
              pickFile(e.dataTransfer.files?.[0]?.name);
            }}
            className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-12 text-center transition ${
              dragOver
                ? 'border-gold-400 bg-gold-50/60'
                : 'border-silver-300/70 bg-white/40 hover:border-gold-300'
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={e => pickFile(e.target.files?.[0]?.name)}
            />
            <span className="flex h-16 w-16 items-center justify-center rounded-full glass-gold text-3xl text-gold-600">
              <i className="icon-upload" />
            </span>
            <div>
              <p className="font-bold text-ink">
                اسحب الفيديو هنا أو اضغط للاختيار
              </p>
              <p className="text-xs text-ink-faint">
                MP4 · MOV · حتى 500 ميجابايت
              </p>
            </div>
            {fileName && (
              <Badge tone="success" icon="icon-file">
                {fileName}
              </Badge>
            )}
          </label>

          <div className="mt-4 flex flex-col gap-4">
            <Input
              label="عنوان الفيديو"
              placeholder="مثال: تنظيف المفروشات - نقاء كلين"
              value={videoTitle}
              onChange={e => setVideoTitle(e.target.value)}
              icon="icon-edit"
            />
            <div>
              <label className="mr-1 text-xs font-bold text-ink-soft">
                عدد الجمل للاختيار التلقائي: {count}
              </label>
              <input
                type="range"
                min={1}
                max={6}
                value={count}
                onChange={e => setCount(Number(e.target.value))}
                className="mt-2 w-full accent-gold-500"
              />
            </div>
          </div>
        </Card>

        {/* Actions */}
        <Card variant="gold" className="flex flex-col gap-4">
          <h3 className="flex items-center gap-2">
            <i className="icon-vector text-gold-600" /> طريقة اختيار الجمل
          </h3>
          <button
            onClick={handleAuto}
            className="flex items-start gap-3 rounded-2xl bg-white/60 p-4 text-right ring-1 ring-white/70 transition hover:-translate-y-0.5 hover:shadow-glass"
          >
            <i className="icon-vector mt-0.5 text-xl text-gold-600" />
            <span>
              <span className="block font-bold text-ink">اختيار تلقائي</span>
              <span className="block text-xs text-ink-faint">
                يختار LION AI أفضل {count} جمل من المكتبة ويرسلها للمصنع مباشرة.
              </span>
            </span>
          </button>
          <button
            onClick={() => navigate('/sentence-select')}
            className="flex items-start gap-3 rounded-2xl bg-white/60 p-4 text-right ring-1 ring-white/70 transition hover:-translate-y-0.5 hover:shadow-glass"
          >
            <i className="icon-edit-square mt-0.5 text-xl text-gold-600" />
            <span>
              <span className="block font-bold text-ink">اختيار يدوي</span>
              <span className="block text-xs text-ink-faint">
                اختر الجمل بنفسك من مكتبة الجمل خطوة بخطوة.
              </span>
            </span>
          </button>

          <Button icon="icon-box" className="mt-auto w-full" onClick={handleAuto}>
            إرسال إلى المصنع
          </Button>
        </Card>
      </div>

      {!fileName && (
        <EmptyState
          icon="icon-Info-circle"
          title="لم يتم اختيار فيديو بعد"
          hint="يمكنك المتابعة بالاختيار التلقائي وسيتم استخدام اسم افتراضي، أو ارفع ملف الفيديو أولاً."
        />
      )}
    </Container>
  );
};
