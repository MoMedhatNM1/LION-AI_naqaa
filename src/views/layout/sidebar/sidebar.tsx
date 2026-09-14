import { useSidebarStore } from '@/store';
import { Brand } from '@/views/layout/brand';
import { SidebarMenu, SidebarToggler } from '.';
import clsx from 'clsx';

const SidebarContent = ({ collapsed }: { collapsed: boolean }) => (
  <div className="flex h-full flex-col gap-2 p-3">
    <div className={clsx('px-1 py-2', collapsed && 'flex justify-center')}>
      <Brand collapsed={collapsed} />
    </div>
    <span className="mx-1 mb-1 h-px gold-divider" />
    <SidebarMenu collapsed={collapsed} />
    <div className="mt-auto pt-2">
      <div
        className={clsx(
          'flex items-center gap-2 rounded-2xl glass-soft px-3 py-2.5',
          collapsed && 'justify-center'
        )}
      >
        <span className="flex h-8 w-8 shrink-0 animate-pulse-soft items-center justify-center rounded-full bg-success/15 text-success">
          <i className="icon-check-circle" />
        </span>
        {!collapsed && (
          <div className="leading-tight">
            <p className="text-xs font-bold text-ink">النظام يعمل</p>
            <p className="text-[10px] text-ink-faint">آخر تحديث الآن</p>
          </div>
        )}
      </div>
    </div>
  </div>
);

export const Sidebar = () => {
  const { isSidebarOpen, isMobileOpen, closeMobile } = useSidebarStore();

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={clsx(
          'relative hidden shrink-0 rounded-primary glass transition-[width] duration-300 sm:block',
          isSidebarOpen ? 'sm:w-[268px]' : 'sm:w-[86px]'
        )}
        role="sidebar"
      >
        <SidebarToggler />
        <SidebarContent collapsed={!isSidebarOpen} />
      </aside>

      {/* Mobile drawer */}
      <div
        className={clsx(
          'fixed inset-0 z-50 sm:hidden',
          isMobileOpen ? 'pointer-events-auto' : 'pointer-events-none'
        )}
      >
        <div
          onClick={closeMobile}
          className={clsx(
            'absolute inset-0 bg-ink/20 backdrop-blur-sm transition-opacity duration-300',
            isMobileOpen ? 'opacity-100' : 'opacity-0'
          )}
        />
        <aside
          className={clsx(
            'absolute inset-y-0 right-0 w-[272px] rounded-l-primary glass shadow-glass-lg transition-transform duration-300',
            isMobileOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <button
            onClick={closeMobile}
            aria-label="إغلاق القائمة"
            className="absolute left-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/70 text-ink-soft transition hover:text-ink"
          >
            <i className="icon-close-circle text-lg" />
          </button>
          <SidebarContent collapsed={false} />
        </aside>
      </div>
    </>
  );
};
