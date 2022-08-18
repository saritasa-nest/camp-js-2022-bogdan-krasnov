import { memo, FC } from 'react';
import { Formik, Form, Field } from 'formik';

import { Box, Button, Container, Link, Typography } from '@mui/material';

import { TextField } from 'formik-mui';

import { useAppDispatch } from '@js-camp/react/store/store';

import { authRegister } from '@js-camp/react/store/auth/dispatchers';

import { initValues, registerFormSchema, RegisterFormValue } from './form-settings';

const RegisterFormComponent: FC = () => {
  const dispatch = useAppDispatch();

  const handleUserRegister = (values: RegisterFormValue) => {
    dispatch(authRegister(values));
  };

  return (
    <Container component="main" maxWidth="xs">
      <Formik
        initialValues={initValues}
        validationSchema={registerFormSchema}
        onSubmit={handleUserRegister}
      >
        <Form>
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Field
              component={TextField}
              margin="normal"
              required
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <Field
              component={TextField}
              margin="normal"
              required
              name="first name"
              label="first name"
              type="text"
              id="firstName"
            />
            <Field
              component={TextField}
              margin="normal"
              required
              name="last name"
              label="last name"
              type="text"
              id="lastName"
            />
            {/* <Field
              component={TextField}
              margin="normal"
              required
              name="password"
              label="password"
              type="password"
              id="password"
            /> */}
            <Field
              component={TextField}
              margin="normal"
              required
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Link href="#" variant="body2">
              {'Already have an account? Sign Up'}
            </Link>
          </Box>
        </Form>
      </Formik>
    </Container>
  );
};

export const RegisterForm = memo(RegisterFormComponent);
