import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

export const selectUser = createSelector((state: RootState) => state.auth.user, user => user);

export const selectUserLoading = createSelector((state: RootState) => state.auth.isLoading, isLoading => isLoading);

export const selectUserError = createSelector((state: RootState) => state.auth.error, error => error);
