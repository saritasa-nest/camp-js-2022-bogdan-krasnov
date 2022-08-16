import { memo, FC } from 'react';
import { LoginForm } from '../../components/LoginForm/LoginForm';

const initValues = {
  email: '',
  password: '',
}
const LoginPageComponent: FC = () => (
  <div>
    <LoginForm />
  </div>
);

export const LoginPage = memo(LoginPageComponent);
