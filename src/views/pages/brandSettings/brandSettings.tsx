import { useState } from 'react';
import { RouteTitle } from '@/router';
import { useAppStore, BrandInfo } from '@/store';
import {
  Container,
  Card,
  Button,
  Input,
  PageHeader,
} from '@/views/components';
import { toast } from '@/toast';
import naqaaSrc from '@/assets/images/naqaa.svg';
import lionSrc from '@/assets/images/lion.svg';

const contactFields: { key: keyof BrandInfo; label: string; icon: string }[] = [
  { key: 'website', label: 'الموقع الإلكتروني', icon: 'icon-link' },
  { key: 'phone', label: 'رقم الهاتف', icon: 'icon-call' },
  { key: 'whatsapp', label: 'واتساب', icon: 'icon-smartphone' },
  { key: 'email', label: 'البريد الإلكتروني', icon: 'icon-mail' },
  { key: 'address', label: 'العنوان', icon: 'icon-location' },
];

const socialFields: { key: keyof BrandInfo; label: string; icon: string }[] = [
  { key: 'instagram', label: 'انستغرام', icon: 'icon-heart' },
  { key: 'tiktok', label: 'تيك توك', icon: 'icon-volume-up' },
  { key: 'youtube', label: 'يوتيوب', icon: 'icon-volume-off' },
  { key: 'x', label: 'إكس', icon: 'icon-share' },
  { key: 'snapchat', label: 'سناب شات', icon: 'icon-image' },
];

export const BrandSettings = ({ title }: RouteTitle) => {
  const { brand, updateBrand } = useAppStore();
  const [form, setForm] = useState<BrandInfo>(brand);

  const set = (key: keyof BrandInfo, value: string) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const save = () => {
    updateBrand(form);
    toast.success('تم حفظ بيانات الشعار والتواصل');
  };

  return (
    <Container>
      <PageHeader
        icon="icon-image"
        title={title ?? 'إعدادات الشعار وبيانات التواصل'}
        subtitle="هوية نقاء كلين وبيانات التواصل داخل النظام"
        actions={
          <Button icon="icon-save" onClick={save}>
            حفظ التغييرات
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Logo preview */}
        <Card variant="gold" className="flex flex-col items-center gap-4 text-center">
          <h3 className="self-start flex items-center gap-2">
            <i className="icon-image text-gold-600" /> الشعار
          </h3>
          <div className="flex flex-col items-center gap-3 rounded-3xl bg-white/60 px-6 py-8 ring-1 ring-white/70">
            <img src={naqaaSrc} alt="نقاء كلين" className="h-20 w-20" />
            <div>
              <h2>{form.companyNameAr}</h2>
              <p className="text-sm tracking-wide text-ink-soft">
                {form.companyNameEn}
              </p>
            </div>
            <p className="text-xs text-ink-faint">{form.tagline}</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-ink-faint">
            <img src={lionSrc} alt="LION AI" className="h-6 w-6" />
            مُدار بواسطة LION AI
          </div>
        </Card>

        {/* Identity */}
        <Card className="lg:col-span-2">
          <h3 className="mb-4 flex items-center gap-2">
            <i className="icon-edit-square text-gold-600" /> هوية الشركة
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <Input
              label="الاسم بالعربية"
              value={form.companyNameAr}
              onChange={e => set('companyNameAr', e.target.value)}
              icon="icon-edit"
            />
            <Input
              label="الاسم بالإنجليزية"
              value={form.companyNameEn}
              onChange={e => set('companyNameEn', e.target.value)}
              icon="icon-edit"
            />
            <div className="sm:col-span-2">
              <Input
                label="الشعار النصي (Tagline)"
                value={form.tagline}
                onChange={e => set('tagline', e.target.value)}
                icon="icon-star"
              />
            </div>
          </div>

          <h3 className="mb-4 mt-6 flex items-center gap-2">
            <i className="icon-call text-gold-600" /> بيانات التواصل
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {contactFields.map(f => (
              <Input
                key={f.key}
                label={f.label}
                value={String(form[f.key])}
                onChange={e => set(f.key, e.target.value)}
                icon={f.icon}
              />
            ))}
          </div>

          <h3 className="mb-4 mt-6 flex items-center gap-2">
            <i className="icon-share text-gold-600" /> مواقع التواصل
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {socialFields.map(f => (
              <Input
                key={f.key}
                label={f.label}
                value={String(form[f.key])}
                onChange={e => set(f.key, e.target.value)}
                icon={f.icon}
              />
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <Button icon="icon-save" onClick={save}>
              حفظ التغييرات
            </Button>
          </div>
        </Card>
      </div>
    </Container>
  );
};
