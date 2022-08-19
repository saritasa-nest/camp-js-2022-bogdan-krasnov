import { selectUser } from '@js-camp/react/store/auth/selectors';
import { memo } from 'react';
import { Navigate, Outlet, To } from 'react-router-dom';

import { useAppSelector } from '../../store';

const AuthGuardComponent = () => {
  const user = useAppSelector(selectUser);
  const redirect: To = {
    pathname: '/login',
  };

  if (!user) {
    return <Navigate to={redirect} replace />;
  }
  return <Outlet />;
};

export const AuthGuard = memo(AuthGuardComponent);
