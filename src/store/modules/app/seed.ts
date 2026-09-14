import {
  BrandInfo,
  ContentItem,
  DevTask,
  AppNotification,
  Sentence,
  Video,
} from '.';

export const seedBrand: BrandInfo = {
  companyNameAr: 'نقاء كلين',
  companyNameEn: 'NAQAA CLEAN',
  tagline: 'نحو مستقبل أكثر نظافة وجمالاً',
  website: 'naqaacleanksa.com',
  phone: '+966 55 000 0000',
  whatsapp: '+966 55 000 0000',
  email: 'info@naqaacleanksa.com',
  address: 'المملكة العربية السعودية',
  instagram: '@naqaaclean',
  tiktok: '@naqaaclean',
  youtube: 'NaqaaClean',
  x: '@naqaaclean',
  snapchat: 'naqaaclean',
};

export const seedSentences: Sentence[] = [
  {
    id: 's1',
    text: 'مرحباً بكم في نقاء كلين .. نظافة تليق بمكانكم.',
    category: 'ترحيب',
    favorite: true,
    usedCount: 12,
  },
  {
    id: 's2',
    text: 'نقدّم خدمات تنظيف المنازل والمكاتب بأعلى معايير الجودة.',
    category: 'خدمات',
    favorite: false,
    usedCount: 8,
  },
  {
    id: 's3',
    text: 'تنظيف عميق للمفروشات والكنب بأحدث التقنيات.',
    category: 'خدمات',
    favorite: true,
    usedCount: 15,
  },
  {
    id: 's4',
    text: 'فريق مدرّب ومواد آمنة على صحة عائلتك.',
    category: 'جودة',
    favorite: false,
    usedCount: 5,
  },
  {
    id: 's5',
    text: 'عرض خاص هذا الأسبوع .. خصم يصل إلى 25٪.',
    category: 'عروض',
    favorite: false,
    usedCount: 3,
  },
  {
    id: 's6',
    text: 'احجز الآن ودع النظافة علينا.',
    category: 'ختام',
    favorite: true,
    usedCount: 20,
  },
  {
    id: 's7',
    text: 'نتائج مبهرة تدوم طويلاً مع نقاء كلين.',
    category: 'جودة',
    favorite: false,
    usedCount: 7,
  },
  {
    id: 's8',
    text: 'خدمة تنظيف السجاد بالبخار لنظافة عميقة وآمنة.',
    category: 'خدمات',
    favorite: false,
    usedCount: 4,
  },
  {
    id: 's9',
    text: 'رضاكم غايتنا .. وثقتكم وسام نفتخر به.',
    category: 'جودة',
    favorite: true,
    usedCount: 9,
  },
  {
    id: 's10',
    text: 'تواصل معنا عبر naqaacleanksa.com واطلب خدمتك بسهولة.',
    category: 'ختام',
    favorite: false,
    usedCount: 6,
  },
];

const now = Date.now();
const day = 86400000;

export const seedVideos: Video[] = [
  {
    id: 'v1',
    title: 'تنظيف المفروشات - نقاء كلين',
    fileName: 'sofa-cleaning.mp4',
    status: 'published',
    createdAt: now - day * 2,
    duration: '00:24',
    sentences: ['s1', 's3', 's6'],
    accent: 'from-gold-300 to-gold-600',
    progress: 100,
  },
  {
    id: 'v2',
    title: 'تنظيف السجاد بالبخار',
    fileName: 'carpet-steam.mp4',
    status: 'ready',
    createdAt: now - day,
    duration: '00:31',
    sentences: ['s8', 's4', 's6'],
    accent: 'from-sky-300 to-info',
    progress: 100,
  },
  {
    id: 'v3',
    title: 'عرض الأسبوع الترويجي',
    fileName: 'weekly-offer.mp4',
    status: 'processing',
    createdAt: now - 3600000,
    duration: '00:18',
    sentences: ['s5', 's2', 's10'],
    accent: 'from-emerald-300 to-success',
    progress: 62,
  },
  {
    id: 'v4',
    title: 'رسالة ترحيبية للعملاء',
    fileName: 'welcome.mp4',
    status: 'queued',
    createdAt: now - 1800000,
    duration: '00:15',
    sentences: ['s1', 's9'],
    accent: 'from-fuchsia-300 to-purple-500',
    progress: 0,
  },
];

export const seedTasks: DevTask[] = [
  {
    id: 't1',
    title: 'تجهيز فيديوهات عروض سبتمبر',
    description: 'إنتاج 3 فيديوهات ترويجية لعروض نهاية الشهر.',
    status: 'progress',
    priority: 'عالية',
    assignee: 'فريق المحتوى',
    due: 'اليوم',
  },
  {
    id: 't2',
    title: 'مراجعة صور خدمة تنظيف الكنب',
    description: 'اعتماد الصور قبل النشر على المنصات.',
    status: 'todo',
    priority: 'متوسطة',
    assignee: 'قسم التصميم',
    due: 'غداً',
  },
  {
    id: 't3',
    title: 'تحديث بيانات التواصل في الموقع',
    description: 'مزامنة رقم الواتساب الجديد.',
    status: 'delayed',
    priority: 'عالية',
    assignee: 'الدعم الفني',
    due: 'متأخرة',
  },
  {
    id: 't4',
    title: 'جدولة منشورات الأسبوع القادم',
    description: 'ترتيب 8 منشورات على المنصات.',
    status: 'done',
    priority: 'منخفضة',
    assignee: 'فريق المحتوى',
    due: 'مكتملة',
  },
  {
    id: 't5',
    title: 'تحسين وصف خدمات SEO',
    status: 'todo',
    priority: 'متوسطة',
    assignee: 'التسويق',
    due: 'بعد غد',
  },
];

export const seedContent: ContentItem[] = [
  {
    id: 'c1',
    title: 'منشور: تنظيف المفروشات بالبخار',
    platform: 'انستغرام',
    status: 'published',
    date: '12 سبتمبر 2025',
  },
  {
    id: 'c2',
    title: 'ريلز: قبل وبعد تنظيف السجاد',
    platform: 'تيك توك',
    status: 'scheduled',
    date: '16 سبتمبر 2025',
  },
  {
    id: 'c3',
    title: 'فيديو: جولة في خدمات نقاء',
    platform: 'يوتيوب',
    status: 'draft',
    date: '—',
  },
  {
    id: 'c4',
    title: 'تغريدة: عرض نهاية الأسبوع',
    platform: 'إكس',
    status: 'scheduled',
    date: '15 سبتمبر 2025',
  },
];

export const seedNotifications: AppNotification[] = [
  {
    id: 'n1',
    type: 'success',
    title: 'تم إنتاج فيديو "تنظيف السجاد بالبخار" بنجاح.',
    time: 'قبل 40 دقيقة',
  },
  {
    id: 'n2',
    type: 'warning',
    title: 'مهمة متأخرة: تحديث بيانات التواصل.',
    time: 'قبل ساعة',
  },
  {
    id: 'n3',
    type: 'info',
    title: 'تعليق جديد على فيديو تيك توك.',
    time: 'قبل ساعتين',
  },
];
