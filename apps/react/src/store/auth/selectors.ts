import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Selects user loading state. */
export const selectUser = createSelector((state: RootState) => state.auth.user, user => user);

/** Selects auth loading state. */
export const selectUserLoading = createSelector((state: RootState) => state.auth.isLoading, isLoading => isLoading);

/** Selects auth error state. */
export const selectUserError = createSelector((state: RootState) => state.auth.error, error => error);

/** Selects auth submit state. */
export const selectUserLoggedIn = createSelector((state: RootState) => state.auth.isLoggedIn, isLoggedIn => isLoggedIn);
