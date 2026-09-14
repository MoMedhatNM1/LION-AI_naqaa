import { Children } from '@/types';
import lionSrc from '@/assets/images/lion.svg';

export const Main = ({ children }: Children) => {
  return (
    <main className="relative flex h-[100dvh] items-center justify-center overflow-hidden bg-gradient-to-tr from-silver-100 via-white to-gold-50 p-0 text-ink lg:h-screen">
      {/* Ambient auras */}
      <span className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gold-200/40 blur-3xl" />
      <span className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-sky-200/40 blur-3xl" />
      <span className="pointer-events-none absolute left-1/3 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-white/50 blur-3xl" />
      {/* Lion watermark */}
      <img
        src={lionSrc}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 w-[520px] max-w-none select-none opacity-[0.05] blur-[1px]"
      />
      {children}
    </main>
  );
};
