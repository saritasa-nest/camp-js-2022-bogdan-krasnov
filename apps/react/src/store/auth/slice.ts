import { createSlice } from '@reduxjs/toolkit';

import { authLogin } from './dispatchers';
import { initialState } from './state';

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(authLogin.pending, state => {
      state.isLoading = true;
    })
    .addCase(authLogin.fulfilled, state => {
      state.isLoading = false;
    })
    .addCase(authLogin.rejected, (state, action) => {
      if (action.error.message) {
        state.error = action.error.message;
      }
      state.isLoading = false;
    }),
});
