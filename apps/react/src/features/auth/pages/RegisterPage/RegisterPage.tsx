import { memo, FC } from 'react';

import { RegisterForm } from '../../components/RegisterForm';

const RegisterPageComponent: FC = () => (
  <>
    <RegisterForm />
  </>
);

export const RegisterPage = memo(RegisterPageComponent);
