import { Outlet } from 'react-router-dom';
import { Main, Sidebar, Header } from '.';

export const PrivateLayout = () => (
  <Main>
    <div className="mx-auto flex h-full w-full max-w-[1640px] gap-3 p-3 sm:gap-4 sm:p-4">
      <Sidebar />
      <div className="flex h-full min-w-0 flex-1 flex-col gap-3 sm:gap-4">
        <Header />
        <div className="min-h-0 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  </Main>
);
