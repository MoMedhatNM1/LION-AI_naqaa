import { Outlet } from 'react-router-dom';
import { Main, Glass } from '.';

export const PublicLayout = () => (
  <Main>
    <Glass className="m-4 w-full max-w-md animate-scale-in flex-col">
      <Outlet />
    </Glass>
  </Main>
);
