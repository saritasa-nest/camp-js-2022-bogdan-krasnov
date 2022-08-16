import { memo, FC } from "react";
import { Formik, Form, Field } from "formik";
import { initValues, loginFormSchema, LoginFormValue } from "./form-settings";

const LoginFormComponent: FC = () => {
  const handleUserLogin = (values: LoginFormValue) => {
    console.log("Form data: ", values);
  };
  return (
    <Formik
      initialValues={initValues}
      validationSchema={loginFormSchema}
      onSubmit={handleUserLogin}
    >
      <Form>
        <Field
          margin="normal"
          required
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <Field
          margin="normal"
          required
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export const LoginForm = memo(LoginFormComponent);
