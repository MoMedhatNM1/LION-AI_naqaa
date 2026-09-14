import { useTransition, animated } from '@react-spring/web';
import { useAppStore } from '@/store';
import { AppNotification } from '@/store';

interface NotificationsProps {
  show: boolean;
}

const toneMap: Record<
  AppNotification['type'],
  { icon: string; color: string }
> = {
  success: { icon: 'icon-check-circle', color: 'text-success' },
  warning: { icon: 'icon-Info-circle', color: 'text-warning' },
  info: { icon: 'icon-Info-circle', color: 'text-info' },
  error: { icon: 'icon-close-circle', color: 'text-error' },
};

export const Notifications = ({ show }: NotificationsProps) => {
  const { notifications, clearNotifications } = useAppStore();
  const transition = useTransition(show, {
    from: { opacity: 0, transform: 'translateY(10px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    leave: { opacity: 0, transform: 'translateY(10px)' },
    config: { tension: 320, friction: 26 },
  });

  return transition(
    (style, open) =>
      open && (
        <animated.div
          style={style}
          className="absolute left-0 top-full z-40 mt-2 flex max-h-[70vh] w-[300px] flex-col overflow-hidden rounded-2xl glass shadow-glass-lg"
        >
          <div className="flex items-center justify-between border-b border-white/50 px-4 py-3">
            <h5 className="text-ink">التنبيهات</h5>
            {notifications.length > 0 && (
              <button
                onClick={clearNotifications}
                className="text-xs font-bold text-gold-600 hover:text-gold-700"
              >
                مسح الكل
              </button>
            )}
          </div>
          <div className="no-scrollbar flex flex-col divide-y divide-white/40 overflow-y-auto">
            {notifications.length === 0 && (
              <p className="px-4 py-8 text-center text-sm text-ink-faint">
                لا توجد تنبيهات جديدة
              </p>
            )}
            {notifications.map(n => (
              <div
                key={n.id}
                className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-white/40"
              >
                <span className={`mt-0.5 text-lg ${toneMap[n.type].color}`}>
                  <i className={toneMap[n.type].icon} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm leading-snug text-ink">{n.title}</p>
                  <span className="text-[11px] text-ink-faint">{n.time}</span>
                </div>
              </div>
            ))}
          </div>
        </animated.div>
      )
  );
};
