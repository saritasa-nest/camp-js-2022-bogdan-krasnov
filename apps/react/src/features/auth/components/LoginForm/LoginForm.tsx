import { memo, FC } from 'react';
import { Formik, Form, Field } from 'formik';

import { Box, Button, CircularProgress, Container, Link, Typography } from '@mui/material';

import { TextField } from 'formik-mui';

import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';

import { authLogin } from '@js-camp/react/store/auth/dispatchers';

import { selectUserError, selectUserLoading } from '@js-camp/react/store/auth/selectors';

import { initValues, loginFormSchema, LoginFormValue } from './form-settings';

const LoginFormComponent: FC = () => {

  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(selectUserLoading);
  const loginError = useAppSelector(selectUserError);

  const handleUserLogin = (values: LoginFormValue) => {
    dispatch(authLogin(values));
  };

  return (
    <Container component="main" maxWidth="xs">
      <Formik
        initialValues={initValues}
        validationSchema={loginFormSchema}
        onSubmit={handleUserLogin}
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
              Sign in
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
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {
              loginError ? 'Error, incorrect password or email.' : null
            }
            {
              isLoading ? (
                <CircularProgress />
              ) : (
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Sign In
                </Button>
              )
            }
            <Link href="/" variant="body2">
              {'No have an account? Sign Up'}
            </Link>
          </Box>
        </Form>
      </Formik>
    </Container>
  );
};

export const LoginForm = memo(LoginFormComponent);
