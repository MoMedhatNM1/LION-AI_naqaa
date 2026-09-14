import { useSidebarStore } from '@/store';

export const SidebarToggler = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebarStore();

  return (
    <button
      className="absolute -left-3 top-8 z-20 hidden h-7 w-7 items-center justify-center rounded-full glass text-ink-soft shadow-glass outline-none transition hover:text-gold-600 sm:inline-flex"
      onClick={toggleSidebar}
      aria-label="طي القائمة الجانبية"
    >
      <i className={isSidebarOpen ? 'icon-right' : 'icon-left'} />
    </button>
  );
};
