export type SentenceCategory =
  | 'ترحيب'
  | 'خدمات'
  | 'عروض'
  | 'جودة'
  | 'ختام';

export interface Sentence {
  id: string;
  text: string;
  category: SentenceCategory;
  favorite: boolean;
  usedCount: number;
}

export type VideoStatus = 'queued' | 'processing' | 'ready' | 'published';

export interface Video {
  id: string;
  title: string;
  fileName: string;
  status: VideoStatus;
  createdAt: number;
  duration: string;
  sentences: string[];
  accent: string; // tailwind gradient hue for thumbnail
  progress: number; // 0-100 for processing
}

export type TaskStatus = 'todo' | 'progress' | 'done' | 'delayed';

export interface DevTask {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: 'عالية' | 'متوسطة' | 'منخفضة';
  assignee: string;
  due: string;
}

export type ContentStatus = 'draft' | 'scheduled' | 'published';

export interface ContentItem {
  id: string;
  title: string;
  platform: 'انستغرام' | 'تيك توك' | 'يوتيوب' | 'إكس' | 'سناب شات';
  status: ContentStatus;
  date: string;
}

export interface AppNotification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  time: string;
}

export interface BrandInfo {
  companyNameAr: string;
  companyNameEn: string;
  tagline: string;
  website: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  instagram: string;
  tiktok: string;
  youtube: string;
  x: string;
  snapchat: string;
}

export interface AppStore {
  brand: BrandInfo;
  sentences: Sentence[];
  videos: Video[];
  tasks: DevTask[];
  content: ContentItem[];
  notifications: AppNotification[];

  // brand
  updateBrand: (patch: Partial<BrandInfo>) => void;

  // sentences
  addSentence: (text: string, category: SentenceCategory) => void;
  updateSentence: (id: string, patch: Partial<Sentence>) => void;
  deleteSentence: (id: string) => void;
  toggleFavorite: (id: string) => void;
  autoSelectSentences: (count: number, category?: SentenceCategory) => string[];

  // videos
  createVideo: (payload: {
    title: string;
    fileName: string;
    duration: string;
    sentences: string[];
  }) => string;
  advanceVideo: (id: string, status: VideoStatus) => void;
  deleteVideo: (id: string) => void;

  // tasks
  addTask: (task: Omit<DevTask, 'id'>) => void;
  setTaskStatus: (id: string, status: TaskStatus) => void;
  deleteTask: (id: string) => void;

  // content
  addContent: (item: Omit<ContentItem, 'id'>) => void;
  setContentStatus: (id: string, status: ContentStatus) => void;
  deleteContent: (id: string) => void;

  // notifications
  pushNotification: (n: Omit<AppNotification, 'id' | 'time'>) => void;
  clearNotifications: () => void;
}
