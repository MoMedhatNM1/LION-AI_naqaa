import { lazily } from 'react-lazily';
import { RouteType } from '@/router';

const {
  Home,
  Overview,
  Factory,
  FactoryStatus,
  Upload,
  SentenceSelect,
  SentenceLibrary,
  PreviousVideos,
  ContentManagement,
  Tasks,
  BrandSettings,
  Settings,
} = lazily(() => import('@/views/pages'));

const GROUP_NAQAA = 'نقاء كلين';
const GROUP_PRODUCTION = 'الإنتاج';
const GROUP_SYSTEM = 'النظام';

export const privateRoutes: RouteType[] = [
  {
    id: 'home',
    path: 'home',
    Element: () => <Home title="الرئيسية" />,
    menu: { icon: <i className="icon-home" />, text: 'الرئيسية' },
  },
  {
    id: 'overview',
    path: 'overview',
    Element: () => <Overview title="نظرة عامة على نقاء" />,
    menu: {
      icon: <i className="icon-category" />,
      text: 'نظرة عامة على نقاء',
      group: GROUP_NAQAA,
    },
  },
  {
    id: 'factory',
    path: 'factory',
    Element: () => <Factory title="مصنع فيديوهات نقاء" />,
    menu: {
      icon: <i className="icon-box" />,
      text: 'مصنع فيديوهات نقاء',
      group: GROUP_NAQAA,
    },
  },
  {
    id: 'factory-status',
    path: 'factory-status',
    Element: () => <FactoryStatus title="حالة المصنع" />,
    menu: {
      icon: <i className="icon-graph" />,
      text: 'حالة المصنع',
      group: GROUP_NAQAA,
    },
  },
  {
    id: 'upload',
    path: 'upload',
    Element: () => <Upload title="رفع الفيديو" />,
    menu: {
      icon: <i className="icon-upload" />,
      text: 'رفع الفيديو',
      group: GROUP_PRODUCTION,
    },
  },
  {
    id: 'sentence-select',
    path: 'sentence-select',
    Element: () => <SentenceSelect title="اختيار الجمل" />,
    menu: {
      icon: <i className="icon-vector" />,
      text: 'اختيار الجمل',
      group: GROUP_PRODUCTION,
    },
  },
  {
    id: 'sentences',
    path: 'sentences',
    Element: () => <SentenceLibrary title="مكتبة الجمل" />,
    menu: {
      icon: <i className="icon-book" />,
      text: 'مكتبة الجمل',
      group: GROUP_PRODUCTION,
    },
  },
  {
    id: 'videos',
    path: 'videos',
    Element: () => <PreviousVideos title="الفيديوهات السابقة" />,
    menu: {
      icon: <i className="icon-folder" />,
      text: 'الفيديوهات السابقة',
      group: GROUP_PRODUCTION,
    },
  },
  {
    id: 'content',
    path: 'content',
    Element: () => <ContentManagement title="إدارة المحتوى" />,
    menu: {
      icon: <i className="icon-document" />,
      text: 'إدارة المحتوى',
      group: GROUP_SYSTEM,
    },
  },
  {
    id: 'tasks',
    path: 'tasks',
    Element: () => <Tasks title="المهام والتطويرات" />,
    menu: {
      icon: <i className="icon-edit-square" />,
      text: 'المهام والتطويرات',
      group: GROUP_SYSTEM,
    },
  },
  {
    id: 'brand',
    path: 'brand',
    Element: () => <BrandSettings title="إعدادات الشعار وبيانات التواصل" />,
    menu: {
      icon: <i className="icon-image" />,
      text: 'الشعار والتواصل',
      group: GROUP_SYSTEM,
    },
  },
  {
    id: 'settings',
    path: 'settings',
    Element: () => <Settings title="الإعدادات" />,
    menu: {
      icon: <i className="icon-settings" />,
      text: 'الإعدادات',
      group: GROUP_SYSTEM,
    },
  },
];
