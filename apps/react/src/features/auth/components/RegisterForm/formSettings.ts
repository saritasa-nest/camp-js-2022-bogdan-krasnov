import { Registration } from '@js-camp//core/models/registration';
import * as Yup from 'yup';

/** Login form. */
export type RegisterFormValue = Registration;

export const initValues: RegisterFormValue = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

export const registerFormSchema: Yup.SchemaOf<RegisterFormValue> = Yup.object().shape({
  firstName: Yup
    .string()
    .min(3, 'Too Short!')
    .required('Required'),
  lastName: Yup
    .string()
    .min(3, 'Too Short!')
    .required('Required'),

  email: Yup.string().email()
    .required()
    .nullable(false),
  password: Yup.string().required(),
  passwordConfirmation: Yup
    .string()
    .nullable(true)
    .required('Password Confirmation is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});
