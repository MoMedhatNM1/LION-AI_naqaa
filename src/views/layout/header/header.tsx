import { useSidebarStore } from '@/store';
import { Brand } from '@/views/layout/brand';
import { HeaderMenu } from '.';

const arDate = new Intl.DateTimeFormat('ar-SA-u-ca-gregory', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
}).format(new Date());

export const Header = () => {
  const { openMobile } = useSidebarStore();

  return (
    <header
      className="flex items-center gap-3 rounded-primary glass px-4 py-3"
      role="header"
    >
      {/* Mobile burger */}
      <button
        onClick={openMobile}
        aria-label="فتح القائمة"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl glass-soft text-xl text-ink-soft transition hover:text-gold-600 sm:hidden"
      >
        <i className="icon-burger-menu" />
      </button>

      {/* Mobile brand */}
      <div className="sm:hidden">
        <Brand collapsed />
      </div>

      {/* Search */}
      <div className="relative hidden flex-1 items-center sm:flex">
        <i className="icon-search pointer-events-none absolute right-4 text-lg text-ink-faint" />
        <input
          type="search"
          placeholder="ابحث في المهام، الفيديوهات، الجمل ..."
          className="w-full max-w-xl rounded-full bg-white/60 py-2.5 pr-11 pl-4 text-sm text-ink outline-none ring-1 ring-silver-300/60 backdrop-blur transition-shadow placeholder:text-ink-faint focus:ring-gold-400"
        />
      </div>

      <div className="flex-1 sm:hidden" />

      {/* Date */}
      <div className="hidden flex-col items-end text-left lg:flex">
        <span className="text-xs font-bold text-ink">{arDate}</span>
        <span className="text-[11px] text-ink-faint">نقاء كلين · لوحة LION AI</span>
      </div>

      <HeaderMenu />
    </header>
  );
};
