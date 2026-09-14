import { useMemo, useState } from 'react';
import { RouteTitle } from '@/router';
import { useAppStore, SentenceCategory } from '@/store';
import {
  Container,
  Card,
  Button,
  Input,
  Badge,
  Select,
  PageHeader,
  StatCard,
  EmptyState,
} from '@/views/components';
import { toast } from '@/toast';

const categories: SentenceCategory[] = [
  'ترحيب',
  'خدمات',
  'عروض',
  'جودة',
  'ختام',
];

export const SentenceLibrary = ({ title }: RouteTitle) => {
  const { sentences, addSentence, deleteSentence, toggleFavorite } =
    useAppStore();
  const [text, setText] = useState('');
  const [category, setCategory] = useState<SentenceCategory>('خدمات');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<SentenceCategory | 'الكل'>('الكل');

  const filtered = useMemo(
    () =>
      sentences.filter(
        s =>
          (filter === 'الكل' || s.category === filter) &&
          s.text.includes(query.trim())
      ),
    [sentences, filter, query]
  );

  const add = () => {
    if (text.trim().length < 3) {
      toast.error('اكتب جملة صحيحة');
      return;
    }
    addSentence(text.trim(), category);
    setText('');
    toast.success('تمت إضافة الجملة إلى المكتبة');
  };

  const remove = (id: string) => {
    deleteSentence(id);
    toast.success('تم حذف الجملة');
  };

  return (
    <Container>
      <PageHeader
        icon="icon-book"
        title={title ?? 'مكتبة الجمل'}
        subtitle="جمل نقاء كلين الجاهزة لتغذية مصنع الفيديو"
      />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard icon="icon-book" label="إجمالي الجمل" value={sentences.length} tone="gold" />
        <StatCard
          icon="icon-heart"
          label="مفضلة"
          value={sentences.filter(s => s.favorite).length}
          tone="warning"
        />
        <StatCard icon="icon-category" label="التصنيفات" value={categories.length} tone="info" />
        <StatCard
          icon="icon-refresh"
          label="مرات الاستخدام"
          value={sentences.reduce((a, s) => a + s.usedCount, 0)}
          tone="success"
        />
      </div>

      {/* Add form */}
      <Card>
        <h3 className="mb-4 flex items-center gap-2">
          <i className="icon-add-user text-gold-600" /> إضافة جملة جديدة
        </h3>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <Input
            label="نص الجملة"
            placeholder="اكتب جملة تسويقية لنقاء كلين ..."
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && add()}
            icon="icon-edit"
          />
          <div className="sm:w-44">
            <Select
              label="التصنيف"
              value={category}
              onChange={e => setCategory(e.target.value as SentenceCategory)}
            >
              {categories.map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </div>
          <Button icon="icon-save" onClick={add} className="shrink-0">
            إضافة
          </Button>
        </div>
      </Card>

      {/* Filters + list */}
      <Card>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {(['الكل', ...categories] as const).map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                  filter === c
                    ? 'glass-gold text-gold-700'
                    : 'bg-white/50 text-ink-soft ring-1 ring-white/60 hover:text-ink'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="sm:w-60">
            <Input
              placeholder="بحث في الجمل ..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              icon="icon-search"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon="icon-book"
            title="لا توجد جمل مطابقة"
            hint="جرّب تغيير التصنيف أو البحث، أو أضف جملة جديدة."
          />
        ) : (
          <ul className="flex flex-col gap-2">
            {filtered.map(s => (
              <li
                key={s.id}
                className="flex items-center gap-3 rounded-2xl bg-white/50 px-3 py-3 ring-1 ring-white/60"
              >
                <button
                  onClick={() => toggleFavorite(s.id)}
                  aria-label="تفضيل"
                  className={`text-lg transition ${
                    s.favorite ? 'text-warning' : 'text-silver-400 hover:text-warning'
                  }`}
                >
                  <i className={s.favorite ? 'icon-star' : 'icon-star'} />
                </button>
                <p className="flex-1 text-sm text-ink">{s.text}</p>
                <Badge tone="neutral" className="hidden sm:inline-flex">
                  <i className="icon-refresh" /> {s.usedCount}
                </Badge>
                <Badge tone="gold">{s.category}</Badge>
                <button
                  onClick={() => remove(s.id)}
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
