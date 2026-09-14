import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AppStore } from '.';
import {
  seedBrand,
  seedContent,
  seedNotifications,
  seedSentences,
  seedTasks,
  seedVideos,
} from './seed';

const uid = (prefix: string) =>
  `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;

const accents = [
  'from-gold-300 to-gold-600',
  'from-sky-300 to-info',
  'from-emerald-300 to-success',
  'from-fuchsia-300 to-purple-500',
  'from-amber-300 to-warning',
];

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      brand: seedBrand,
      sentences: seedSentences,
      videos: seedVideos,
      tasks: seedTasks,
      content: seedContent,
      notifications: seedNotifications,

      updateBrand: patch =>
        set(state => ({ brand: { ...state.brand, ...patch } })),

      addSentence: (text, category) =>
        set(state => ({
          sentences: [
            {
              id: uid('s'),
              text,
              category,
              favorite: false,
              usedCount: 0,
            },
            ...state.sentences,
          ],
        })),

      updateSentence: (id, patch) =>
        set(state => ({
          sentences: state.sentences.map(s =>
            s.id === id ? { ...s, ...patch } : s
          ),
        })),

      deleteSentence: id =>
        set(state => ({
          sentences: state.sentences.filter(s => s.id !== id),
        })),

      toggleFavorite: id =>
        set(state => ({
          sentences: state.sentences.map(s =>
            s.id === id ? { ...s, favorite: !s.favorite } : s
          ),
        })),

      autoSelectSentences: (count, category) => {
        const pool = get().sentences.filter(
          s => !category || s.category === category
        );
        const shuffled = [...pool].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count).map(s => s.id);
      },

      createVideo: ({ title, fileName, duration, sentences }) => {
        const id = uid('v');
        set(state => ({
          videos: [
            {
              id,
              title,
              fileName,
              status: 'queued',
              createdAt: Date.now(),
              duration,
              sentences,
              accent: accents[state.videos.length % accents.length],
              progress: 0,
            },
            ...state.videos,
          ],
          sentences: state.sentences.map(s =>
            sentences.includes(s.id)
              ? { ...s, usedCount: s.usedCount + 1 }
              : s
          ),
          notifications: [
            {
              id: uid('n'),
              type: 'info',
              title: `تم إرسال "${title}" إلى مصنع الفيديو.`,
              time: 'الآن',
            },
            ...state.notifications,
          ],
        }));
        return id;
      },

      advanceVideo: (id, status) =>
        set(state => ({
          videos: state.videos.map(v =>
            v.id === id
              ? { ...v, status, progress: status === 'queued' ? 0 : 100 }
              : v
          ),
        })),

      deleteVideo: id =>
        set(state => ({ videos: state.videos.filter(v => v.id !== id) })),

      addTask: task =>
        set(state => ({ tasks: [{ ...task, id: uid('t') }, ...state.tasks] })),

      setTaskStatus: (id, status) =>
        set(state => ({
          tasks: state.tasks.map(t => (t.id === id ? { ...t, status } : t)),
        })),

      deleteTask: id =>
        set(state => ({ tasks: state.tasks.filter(t => t.id !== id) })),

      addContent: item =>
        set(state => ({
          content: [{ ...item, id: uid('c') }, ...state.content],
        })),

      setContentStatus: (id, status) =>
        set(state => ({
          content: state.content.map(c =>
            c.id === id ? { ...c, status } : c
          ),
        })),

      deleteContent: id =>
        set(state => ({ content: state.content.filter(c => c.id !== id) })),

      pushNotification: n =>
        set(state => ({
          notifications: [
            { ...n, id: uid('n'), time: 'الآن' },
            ...state.notifications,
          ],
        })),

      clearNotifications: () => set(() => ({ notifications: [] })),
    }),
    {
      name: 'lion-ai-naqaa',
      version: 1,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
