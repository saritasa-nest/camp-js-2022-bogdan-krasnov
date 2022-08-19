import axios, { AxiosRequestConfig } from 'axios';

import { CONFIG } from './config';
import { AuthService } from './services/authService';
import { TokenService } from './services/tokenService';

import { httpClient } from '.';

/**
 * Checks if a request should be intercepted.
 * @param config - Request config.
 */
function shouldInterceptToken(config: AxiosRequestConfig): boolean {
  return config.baseURL?.startsWith(CONFIG.apiUrl) ?? false;
}

/**
 * Interceptor to append token to requests.
 * @param config Axios config.
 */
export const addTokenBeforeRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  if (!shouldInterceptToken(config)) {
    return config;
  }

  const token = TokenService.getToken();

  if (token == null) {
    return config;
  }

  const { headers } = config;

  if (headers == null) {
    throw new Error(
      'Axios did not pass any header. Please check your request.',
    );
  }

  return {
    ...config,
    headers: {
      ...headers,
      Authorization: `Bearer ${token.access}`,
    },
  };
};

/**
 * Interceptor refresh token.
 * @param error Some error.
 */
export async function refreshToken(error: unknown) {
  const token = TokenService.getToken();

  if (!axios.isAxiosError(error) || token == null) {
    throw error;
  }

  if (shouldInterceptToken(error.config) && Number(error.response) !== 401) {
    throw error;
  }

  try {
    const newToken = await AuthService.refreshToken(token);
    TokenService.setToken(newToken);
    return httpClient(error.config);
  } catch {
    TokenService.removeToken();
  }

  throw error;
}
