import { Registration } from '@js-camp//core/models/registration';
import * as Yup from 'yup';

/** Login form. */
export type RegisterFormValue = Registration;

export const initValues: RegisterFormValue = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

export const registerFormSchema: Yup.SchemaOf<RegisterFormValue> = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),

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
