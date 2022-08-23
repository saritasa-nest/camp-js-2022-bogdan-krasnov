import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import { AuthGuard } from '../../routes/guards/authGuard';

const AnimePage = lazy(() => import('./pages/AnimePage').then(module => ({ default: module.AnimePage })));

export const animeRoutes: RouteObject[] = [
  {
    element: <AuthGuard/>,
    children: [
      {
        path: 'anime',
        element: <AnimePage />,
      },
      {
        path: '*',
        element: <Navigate to="/anime" />,
      },
    ],
  },
];
