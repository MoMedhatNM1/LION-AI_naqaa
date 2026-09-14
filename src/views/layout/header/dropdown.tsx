import { useTransition, animated } from '@react-spring/web';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store';
import { toast } from '@/toast';

interface DropdownProps {
  show: boolean;
  onClose: () => void;
}

export const Dropdown = ({ show, onClose }: DropdownProps) => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuthStore();
  const transition = useTransition(show, {
    from: { opacity: 0, transform: 'translateY(10px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    leave: { opacity: 0, transform: 'translateY(10px)' },
    config: { tension: 320, friction: 26 },
  });

  const handleLogout = () => {
    setAuth(null);
    toast.success('تم تسجيل الخروج بنجاح');
  };

  return transition(
    (style, open) =>
      open && (
        <animated.ul
          style={style}
          className="absolute left-0 top-full z-40 mt-2 flex w-[220px] flex-col overflow-hidden rounded-2xl glass shadow-glass-lg"
        >
          <li className="relative mx-4 flex flex-col items-center gap-0.5 py-4 text-center">
            <h4 className="text-ink">{auth?.name ?? 'المدير التنفيذي'}</h4>
            <h6 className="font-normal text-ink-faint">
              {auth?.email ?? 'admin@naqaacleanksa.com'}
            </h6>
            <span className="absolute bottom-0 w-full gold-divider" style={{ height: 1 }} />
          </li>
          <li>
            <button
              onClick={() => {
                onClose();
                navigate('/settings');
              }}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-ink-soft transition-colors hover:bg-white/50 hover:text-ink"
            >
              <i className="icon-settings text-lg" />
              <span>الإعدادات</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                onClose();
                navigate('/brand');
              }}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-ink-soft transition-colors hover:bg-white/50 hover:text-ink"
            >
              <i className="icon-image text-lg" />
              <span>الشعار والتواصل</span>
            </button>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-error transition-colors hover:bg-error/10"
            >
              <i className="icon-logout text-lg" />
              <span>تسجيل الخروج</span>
            </button>
          </li>
        </animated.ul>
      )
  );
};
