import { useState } from 'react';
import { RouteTitle } from '@/router';
import { useAppStore, TaskStatus, DevTask } from '@/store';
import {
  Container,
  Card,
  Button,
  Input,
  Select,
  Badge,
  PageHeader,
} from '@/views/components';
import { toast } from '@/toast';
import { taskStatus, priorityTone } from '../shared';

const columns: TaskStatus[] = ['todo', 'progress', 'done', 'delayed'];
const columnIcon: Record<TaskStatus, string> = {
  todo: 'icon-bookmark',
  progress: 'icon-loading',
  done: 'icon-check-circle',
  delayed: 'icon-Info-circle',
};

const advanceMap: Partial<Record<TaskStatus, TaskStatus>> = {
  todo: 'progress',
  progress: 'done',
  delayed: 'progress',
};

export const Tasks = ({ title }: RouteTitle) => {
  const { tasks, addTask, setTaskStatus, deleteTask } = useAppStore();
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<DevTask['priority']>('متوسطة');

  const add = () => {
    if (text.trim().length < 3) {
      toast.error('اكتب عنوان مهمة صحيح');
      return;
    }
    addTask({
      title: text.trim(),
      status: 'todo',
      priority,
      assignee: 'فريق نقاء',
      due: 'قريباً',
    });
    setText('');
    toast.success('تمت إضافة المهمة');
  };

  return (
    <Container>
      <PageHeader
        icon="icon-edit-square"
        title={title ?? 'المهام والتطويرات'}
        subtitle="لوحة متابعة مهام وتطويرات نقاء كلين"
      />

      {/* Add */}
      <Card>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <Input
            label="مهمة جديدة"
            placeholder="مثال: تصميم غلاف حملة سبتمبر"
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && add()}
            icon="icon-edit"
          />
          <div className="sm:w-40">
            <Select
              label="الأولوية"
              value={priority}
              onChange={e => setPriority(e.target.value as DevTask['priority'])}
            >
              <option value="عالية">عالية</option>
              <option value="متوسطة">متوسطة</option>
              <option value="منخفضة">منخفضة</option>
            </Select>
          </div>
          <Button icon="icon-add-user" onClick={add} className="shrink-0">
            إضافة مهمة
          </Button>
        </div>
      </Card>

      {/* Board */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {columns.map(col => {
          const items = tasks.filter(t => t.status === col);
          return (
            <div key={col} className="flex flex-col gap-3">
              <div className="flex items-center justify-between rounded-2xl glass-soft px-3 py-2.5">
                <span className="flex items-center gap-2 text-sm font-bold text-ink">
                  <i className={`${columnIcon[col]} text-gold-600`} />
                  {taskStatus[col].label}
                </span>
                <Badge tone={taskStatus[col].tone}>{items.length}</Badge>
              </div>
              <div className="flex flex-col gap-2">
                {items.map(t => {
                  const next = advanceMap[t.status];
                  return (
                  <Card key={t.id} variant="soft" padded={false} className="p-3">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-bold text-ink">{t.title}</p>
                      <button
                        onClick={() => {
                          deleteTask(t.id);
                          toast.success('تم حذف المهمة');
                        }}
                        aria-label="حذف"
                        className="shrink-0 text-ink-faint transition hover:text-error"
                      >
                        <i className="icon-trash text-sm" />
                      </button>
                    </div>
                    {t.description && (
                      <p className="mt-1 text-xs text-ink-faint">
                        {t.description}
                      </p>
                    )}
                    <div className="mt-2 flex items-center gap-2">
                      <Badge tone={priorityTone[t.priority] ?? 'neutral'}>
                        {t.priority}
                      </Badge>
                      <span className="text-[11px] text-ink-faint">
                        {t.assignee}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      {next && (
                        <button
                          onClick={() => setTaskStatus(t.id, next)}
                          className="flex-1 rounded-full bg-white/70 py-1.5 text-xs font-bold text-gold-700 ring-1 ring-white/70 transition hover:shadow-glass"
                        >
                          التالي ←
                        </button>
                      )}
                      {t.status !== 'todo' && t.status !== 'done' && (
                        <button
                          onClick={() => setTaskStatus(t.id, 'todo')}
                          className="rounded-full bg-white/70 px-3 py-1.5 text-xs font-bold text-ink-soft ring-1 ring-white/70 transition hover:text-ink"
                        >
                          إعادة
                        </button>
                      )}
                    </div>
                  </Card>
                  );
                })}
                {items.length === 0 && (
                  <p className="rounded-2xl border border-dashed border-silver-300/70 py-6 text-center text-xs text-ink-faint">
                    لا مهام هنا
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};
