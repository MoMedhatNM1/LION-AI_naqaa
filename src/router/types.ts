export interface RouteTitle {
  title?: string;
}

export interface RouteMenu {
  icon: JSX.Element;
  text: string;
  /** Sidebar section grouping label (optional) */
  group?: string;
}

export interface RouteType {
  id: string;
  path: string;
  Element: ({ title }: RouteTitle) => JSX.Element;
  menu?: RouteMenu;
}
