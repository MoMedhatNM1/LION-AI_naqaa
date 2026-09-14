import { BadgeTone } from '@/views/components';
import { ContentStatus, TaskStatus, VideoStatus } from '@/store';

export const videoStatus: Record<
  VideoStatus,
  { label: string; tone: BadgeTone }
> = {
  queued: { label: 'في الانتظار', tone: 'neutral' },
  processing: { label: 'قيد المعالجة', tone: 'info' },
  ready: { label: 'جاهز', tone: 'success' },
  published: { label: 'منشور', tone: 'gold' },
};

export const taskStatus: Record<
  TaskStatus,
  { label: string; tone: BadgeTone }
> = {
  todo: { label: 'قيد الانتظار', tone: 'neutral' },
  progress: { label: 'قيد التنفيذ', tone: 'info' },
  done: { label: 'مكتملة', tone: 'success' },
  delayed: { label: 'متأخرة', tone: 'error' },
};

export const contentStatus: Record<
  ContentStatus,
  { label: string; tone: BadgeTone }
> = {
  draft: { label: 'مسودة', tone: 'neutral' },
  scheduled: { label: 'مجدول', tone: 'info' },
  published: { label: 'منشور', tone: 'success' },
};

export const priorityTone: Record<string, BadgeTone> = {
  عالية: 'error',
  متوسطة: 'warning',
  منخفضة: 'neutral',
};
