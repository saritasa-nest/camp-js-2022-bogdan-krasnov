import { FC, memo } from 'react';
import { Navigate, Outlet, To } from 'react-router-dom';

import { selectUser } from '@js-camp/react/store/auth/selectors';

import { useAppSelector } from '../../store';

const NonAuthGuardComponent: FC = () => {
  const user = useAppSelector(selectUser);

  const redirect: To = {
    pathname: '/anime',
  };
  if (user != null) {
    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
};

export const NonAuthGuard = memo(NonAuthGuardComponent);
