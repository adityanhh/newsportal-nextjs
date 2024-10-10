import { ReactNode } from 'react';
import Login from '../views/login/page';
import Register from '../views/register/page';

interface Route {
  path: string;
  component: ReactNode;
}

const routes: Route[] = [
  {
    path: '/login',
    component: <Login />,
  },
  {
    path: '/register',
    component: <Register />,
  },
  // Tambahkan rute lain di sini
];

export default routes;