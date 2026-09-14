import { useState } from 'react';
import { RouteTitle } from '@/router';
import { useSidebarStore } from '@/store';
import {
  Container,
  Card,
  Button,
  Toggle,
  Badge,
  PageHeader,
} from '@/views/components';
import { toast } from '@/toast';

interface Pref {
  key: string;
  label: string;
  hint: string;
  icon: string;
  value: boolean;
}

export const Settings = ({ title }: RouteTitle) => {
  const { isSidebarOpen, toggleSidebar } = useSidebarStore();
  const [prefs, setPrefs] = useState<Pref[]>([
    {
      key: 'notifications',
      label: 'تنبيهات النظام',
      hint: 'استقبال تنبيهات المصنع والمهام',
      icon: 'icon-Info-circle',
      value: true,
    },
    {
      key: 'autoSelect',
      label: 'الاختيار التلقائي للجمل',
      hint: 'تفعيل اقتراح الجمل تلقائياً عند الرفع',
      icon: 'icon-vector',
      value: true,
    },
    {
      key: 'sound',
      label: 'أصوات الإشعارات',
      hint: 'تشغيل صوت عند اكتمال الفيديو',
      icon: 'icon-volume-up',
      value: false,
    },
    {
      key: 'autoPublish',
      label: 'النشر التلقائي',
      hint: 'نشر الفيديوهات الجاهزة مباشرة',
      icon: 'icon-send',
      value: false,
    },
  ]);

  const setPref = (key: string, value: boolean) => {
    setPrefs(prev => prev.map(p => (p.key === key ? { ...p, value } : p)));
    toast.success('تم تحديث الإعداد');
  };

  const resetData = () => {
    try {
      localStorage.removeItem('lion-ai-naqaa');
      toast.success('تمت إعادة تعيين بيانات النظام');
      setTimeout(() => window.location.reload(), 600);
    } catch {
      toast.error('تعذر إعادة التعيين');
    }
  };

  return (
    <Container>
      <PageHeader
        icon="icon-settings"
        title={title ?? 'الإعدادات'}
        subtitle="تخصيص نظام LION AI لإدارة نقاء كلين"
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Preferences */}
        <Card className="lg:col-span-2">
          <h3 className="mb-4 flex items-center gap-2">
            <i className="icon-settings text-gold-600" /> التفضيلات العامة
          </h3>
          <ul className="flex flex-col gap-2">
            {prefs.map(p => (
              <li
                key={p.key}
                className="flex items-center gap-3 rounded-2xl bg-white/50 px-3 py-3 ring-1 ring-white/60"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl glass-gold text-gold-600">
                  <i className={p.icon} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-ink">{p.label}</p>
                  <p className="text-[11px] text-ink-faint">{p.hint}</p>
                </div>
                <Toggle
                  checked={p.value}
                  onChange={v => setPref(p.key, v)}
                  id={p.key}
                />
              </li>
            ))}
            <li className="flex items-center gap-3 rounded-2xl bg-white/50 px-3 py-3 ring-1 ring-white/60">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl glass-gold text-gold-600">
                <i className="icon-category" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-ink">
                  توسيع القائمة الجانبية افتراضياً
                </p>
                <p className="text-[11px] text-ink-faint">
                  إظهار القائمة الجانبية بالكامل عند الفتح
                </p>
              </div>
              <Toggle checked={isSidebarOpen} onChange={() => toggleSidebar()} />
            </li>
          </ul>
        </Card>

        {/* System info + danger */}
        <div className="flex flex-col gap-4">
          <Card variant="gold">
            <h3 className="mb-3 flex items-center gap-2">
              <i className="icon-Info-circle text-gold-600" /> معلومات النظام
            </h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li className="flex items-center justify-between">
                <span className="text-ink-soft">النظام</span>
                <span className="font-bold text-ink">LION AI</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-ink-soft">الشركة</span>
                <span className="font-bold text-ink">نقاء كلين</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-ink-soft">الإصدار</span>
                <Badge tone="gold">v1.0</Badge>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-ink-soft">الحالة</span>
                <Badge tone="success" dot>
                  متصل
                </Badge>
              </li>
            </ul>
          </Card>

          <Card>
            <h3 className="mb-2 flex items-center gap-2 text-error">
              <i className="icon-Info-circle" /> منطقة الخطر
            </h3>
            <p className="mb-3 text-xs text-ink-faint">
              إعادة تعيين جميع بيانات النظام التجريبية (الفيديوهات، الجمل،
              المهام، المحتوى) إلى الوضع الافتراضي.
            </p>
            <Button
              variant="danger"
              icon="icon-refresh"
              className="w-full"
              onClick={resetData}
            >
              إعادة تعيين البيانات
            </Button>
          </Card>
        </div>
      </div>
    </Container>
  );
};
