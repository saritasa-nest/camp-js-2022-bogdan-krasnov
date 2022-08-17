import { Login } from '@js-camp/core/models/login';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { UserService } from '../../api/services/userService';

export const authLogin = createAsyncThunk(
  'auth/login',
  (loginData: Login) => UserService.loginUser(loginData),
);
