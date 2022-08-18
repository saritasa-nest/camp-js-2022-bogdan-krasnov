import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

export const selectUserLoading = createSelector((state: RootState) => state.auth.isLoading, isLoading => isLoading);

export const selectUserError = createSelector((state: RootState) => state.auth.error, error => error);

export const selectUserLoggedIn = createSelector((state: RootState) => state.auth.isLoggedIn, isLoggedIn => isLoggedIn);
