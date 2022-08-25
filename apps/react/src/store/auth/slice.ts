import { createSlice } from '@reduxjs/toolkit';

import { authLogin, authRegister } from './dispatchers';
import { initialState } from './state';

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(authLogin.pending, state => {
      state.isLoading = true;
    })
    .addCase(authLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.user = action.payload;
    })
    .addCase(authLogin.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.isLoading = false;
      state.user = null;
      state.isLoggedIn = false;
    })

    .addCase(authRegister.pending, state => {
      state.isLoading = true;
    })
    .addCase(authRegister.fulfilled, state => {
      state.isLoading = false;
      state.isLoggedIn = true;
    })
    .addCase(authRegister.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.isLoading = false;
      state.user = null;
    }),
});
