import { NavLink } from 'react-router-dom';
import { privateRoutes } from '@/router';
import { useSidebarStore } from '@/store';
import clsx from 'clsx';

interface SidebarMenuProps {
  /** when true, show icon-only (collapsed). Defaults to global desktop state. */
  collapsed?: boolean;
}

export const SidebarMenu = ({ collapsed }: SidebarMenuProps) => {
  const { isSidebarOpen, closeMobile } = useSidebarStore();
  const expanded = collapsed === undefined ? isSidebarOpen : !collapsed;

  // Group routes by their menu.group (undefined => top-level)
  const groups: { label?: string; items: typeof privateRoutes }[] = [];
  privateRoutes.forEach(route => {
    if (!route.menu) return;
    const label = route.menu.group;
    const existing = groups.find(g => g.label === label);
    if (existing) existing.items.push(route);
    else groups.push({ label, items: [route] });
  });

  return (
    <nav
      className="no-scrollbar flex w-full flex-col gap-1 overflow-y-auto"
      role="menu"
    >
      {groups.map(({ label, items }, gi) => (
        <div key={label ?? `group-${gi}`} className="flex flex-col gap-1">
          {label && expanded && (
            <span className="mb-1 mt-3 px-3 text-[11px] font-bold uppercase tracking-wider text-ink-faint">
              {label}
            </span>
          )}
          {label && !expanded && (
            <span className="mx-auto my-2 h-px w-6 gold-divider" />
          )}
          {items.map(({ id, path, menu }) => (
            <NavLink
              key={id}
              to={path}
              onClick={closeMobile}
              title={menu?.text}
              className={({ isActive }) =>
                clsx(
                  'group relative flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold transition-all duration-200',
                  !expanded && 'justify-center',
                  isActive
                    ? 'glass-gold text-gold-700 shadow-sm'
                    : 'text-ink-soft hover:bg-white/60 hover:text-ink'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={clsx(
                      'text-xl transition-transform group-hover:scale-110',
                      isActive && 'text-gold-600'
                    )}
                  >
                    {menu?.icon}
                  </span>
                  {expanded && <span className="truncate">{menu?.text}</span>}
                  {isActive && expanded && (
                    <span className="mr-auto h-2 w-2 rounded-full bg-gold-500" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      ))}
    </nav>
  );
};
