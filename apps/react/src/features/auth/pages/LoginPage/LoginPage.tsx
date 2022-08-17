import { memo, FC } from 'react';

import { LoginForm } from '../../components/LoginForm/LoginForm';

const LoginPageComponent: FC = () => (
  <>
    <LoginForm />
  </>
);

export const LoginPage = memo(LoginPageComponent);
