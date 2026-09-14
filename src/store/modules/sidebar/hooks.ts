import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { SidebarStore } from '.';

export const useSidebarStore = create<SidebarStore>()(
  persist(
    set => ({
      isSidebarOpen: true,
      toggleSidebar: () =>
        set(state => ({ isSidebarOpen: !state.isSidebarOpen })),
      isMobileOpen: false,
      openMobile: () => set(() => ({ isMobileOpen: true })),
      closeMobile: () => set(() => ({ isMobileOpen: false })),
    }),
    {
      name: 'sidebar',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        isSidebarOpen: state.isSidebarOpen,
      }),
    }
  )
);
