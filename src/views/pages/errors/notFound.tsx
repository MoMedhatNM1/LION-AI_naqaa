import { Link } from 'react-router-dom';
import lionSrc from '@/assets/images/lion.svg';

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-8 text-center sm:w-[360px]">
      <img src={lionSrc} alt="LION AI" className="h-16 w-16 opacity-80" />
      <h1 className="font-display text-5xl text-gold-gradient">404</h1>
      <h5 className="text-ink">الصفحة غير موجودة</h5>
      <p className="text-sm text-ink-faint">
        الصفحة التي تبحث عنها غير متوفرة داخل نظام LION AI.
      </p>
      <Link
        to="/home"
        className="mt-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-tl from-gold-600 via-gold-400 to-gold-300 px-5 py-2.5 text-sm font-bold text-white shadow-gold transition hover:brightness-105"
      >
        <i className="icon-home" />
        العودة للرئيسية
      </Link>
    </div>
  );
};
