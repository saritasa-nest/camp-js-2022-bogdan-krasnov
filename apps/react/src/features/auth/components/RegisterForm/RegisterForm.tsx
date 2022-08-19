import { memo, FC, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';

import { Box, Button, CircularProgress, Container, Link, Typography } from '@mui/material';

import { TextField } from 'formik-mui';

import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';

import { authRegister } from '@js-camp/react/store/auth/dispatchers';

import { selectUserError, selectUserLoading, selectUserLoggedIn } from '@js-camp/react/store/auth/selectors';

import { useNavigate } from 'react-router-dom';

import {
  initValues,
  registerFormSchema,
  RegisterFormValue,
} from './form-settings';

const RegisterFormComponent: FC = () => {

  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(selectUserLoading);
  const loginError = useAppSelector(selectUserError);
  const isLoggedIn = useAppSelector(selectUserLoggedIn);
  const navigate = useNavigate();

  const handleUserRegister = (values: RegisterFormValue) => {
    dispatch(authRegister(values));
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);

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
              autoFocus
            />
            <Field
              component={TextField}
              margin="normal"
              required
              name="firstName"
              label="first name"
              id="firstName"
            />
            <Field
              component={TextField}
              margin="normal"
              required
              name="lastName"
              label="last name"
              id="lastName"
            />
            <Field
              component={TextField}
              margin="normal"
              required
              name="password"
              label="password"
              type="password"
              id="password"
            />
            <Field
              component={TextField}
              margin="normal"
              required
              name="passwordConfirmation"
              label="passwordConfirmation"
              type="password"
              id="passwordConfirmation"
            />
            {loginError ? 'Error' : null}
            {
              isLoading ? (
                <CircularProgress />
              ) : (
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Sign Up
                </Button>
              )
            }
            <Link href="#/login" variant="body2">
              {'Already have an account? Sign Up'}
            </Link>
          </Box>
        </Form>
      </Formik>
    </Container>
  );
};

export const RegisterForm = memo(RegisterFormComponent);
