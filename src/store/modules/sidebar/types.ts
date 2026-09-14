export interface SidebarStore {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isMobileOpen: boolean;
  openMobile: () => void;
  closeMobile: () => void;
}
