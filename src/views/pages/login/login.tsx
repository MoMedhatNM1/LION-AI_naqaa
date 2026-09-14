import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '@/store';
import { toast } from '@/toast';
import { Input, Button } from '@/views/components';
import lionSrc from '@/assets/images/lion.svg';

const loginSchema = z.object({
  username: z.string().min(3, { message: 'ادخل اسم مستخدم صحيح' }),
  password: z.string().min(3, { message: '3 أحرف على الأقل' }),
});

type LoginForm = z.infer<typeof loginSchema>;

export const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<LoginForm>({
    mode: 'all',
    resolver: zodResolver(loginSchema),
    defaultValues: { username: 'admin', password: 'naqaa' },
  });

  const login = (name: string) => {
    setAuth({
      name: name === 'admin' ? 'أحمد عبدالله' : name,
      image: '',
      email: 'admin@naqaacleanksa.com',
      token: 'local-demo-token',
    });
    toast.success('مرحباً بك في LION AI');
    navigate('/home');
  };

  const onSubmit: SubmitHandler<LoginForm> = ({ username }) => login(username);

  const quickLogin = () => {
    setValue('username', 'admin');
    setValue('password', 'naqaa');
    login('admin');
  };

  return (
    <form
      className="flex flex-col gap-4 p-7 sm:p-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-1 flex flex-col items-center gap-3 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-3xl glass-gold shadow-sm">
          <img src={lionSrc} alt="LION AI" className="h-12 w-12" />
        </span>
        <div>
          <h1 className="font-display text-2xl">
            <span className="text-gold-gradient">LION</span> AI
          </h1>
          <p className="text-sm text-ink-faint">نظام إدارة نقاء كلين</p>
        </div>
        <p className="text-xs text-ink-faint">
          سجّل الدخول للوصول إلى لوحة التحكم
        </p>
      </div>

      <Input
        placeholder="اسم المستخدم"
        type="text"
        register={register('username')}
        errorMsg={errors.username?.message}
        icon="icon-user"
        autoComplete="off"
        autoFocus
      />
      <Input
        placeholder="كلمة المرور"
        type="password"
        register={register('password')}
        errorMsg={errors.password?.message}
        icon="icon-lock"
        autoComplete="off"
      />
      <Button type="submit" disabled={!isValid} className="w-full">
        تسجيل الدخول
      </Button>
      <button
        type="button"
        onClick={quickLogin}
        className="text-center text-xs font-bold text-gold-600 transition hover:text-gold-700"
      >
        دخول تجريبي سريع
      </button>
      <p className="text-center text-[11px] text-ink-faint">
        بيانات تجريبية: admin / naqaa
      </p>
    </form>
  );
};
