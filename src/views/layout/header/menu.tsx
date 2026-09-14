import { useEffect, useRef, useState } from 'react';
import { useAppStore, useAuthStore } from '@/store';
import { Dropdown, Notifications } from '.';

export const HeaderMenu = () => {
  const { auth } = useAuthStore();
  const { notifications } = useAppStore();
  const [openMenu, setOpenMenu] = useState<'user' | 'bell' | null>(null);
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const initials = auth?.name?.trim().charAt(0) ?? 'أ';

  return (
    <ul ref={ref} className="inline-flex shrink-0 items-center gap-2">
      {/* Language chip */}
      <li className="hidden md:block">
        <span className="flex h-9 items-center rounded-full bg-white/60 px-3 text-xs font-bold text-ink-soft ring-1 ring-silver-300/60">
          AR
        </span>
      </li>

      {/* Notifications */}
      <li className="relative">
        <button
          onClick={() =>
            setOpenMenu(openMenu === 'bell' ? null : 'bell')
          }
          aria-label="التنبيهات"
          className="relative flex h-10 w-10 items-center justify-center rounded-2xl glass-soft text-xl text-ink-soft transition hover:text-gold-600"
        >
          <i className="icon-Info-circle" />
          {notifications.length > 0 && (
            <span className="absolute -left-0.5 -top-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gradient-to-tl from-gold-600 to-gold-400 px-1 text-[10px] font-bold text-white shadow">
              {notifications.length}
            </span>
          )}
        </button>
        <Notifications show={openMenu === 'bell'} />
      </li>

      {/* User */}
      <li className="relative">
        <button
          className="flex items-center gap-2 rounded-2xl glass-soft py-1 pl-2 pr-1 transition hover:shadow-glass"
          onClick={() =>
            setOpenMenu(openMenu === 'user' ? null : 'user')
          }
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tl from-gold-600 to-gold-300 font-display text-base font-bold text-white shadow">
            {initials}
          </span>
          <span className="hidden flex-col items-start leading-tight sm:flex">
            <span className="text-xs font-bold text-ink">
              {auth?.name ?? 'المدير التنفيذي'}
            </span>
            <span className="text-[10px] text-ink-faint">نقاء كلين</span>
          </span>
          <i className="icon-down hidden text-sm text-ink-faint sm:block" />
        </button>
        <Dropdown
          show={openMenu === 'user'}
          onClose={() => setOpenMenu(null)}
        />
      </li>
    </ul>
  );
};
