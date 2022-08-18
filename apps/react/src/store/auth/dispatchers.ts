import { Login } from '@js-camp/core/models/login';
import { Registration } from '@js-camp/core/models/registration';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AuthService } from '../../api/services/authService';
import { UserService } from '../../api/services/userService';

export const fetchUser = createAsyncThunk('auth/fetchUser', () => UserService.getUser());

export const authLogin = createAsyncThunk(
  'auth/login',
  (loginData: Login, thunkApi) => {
    try {
      return AuthService.login(loginData);
    } catch (error: unknown) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const authRegister = createAsyncThunk(
  'auth/register',
  (registerData: Registration, thunkApi) => {
    try {
      return AuthService.register(registerData);
    } catch (error: unknown) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
