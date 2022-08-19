import axios, { AxiosInstance } from 'axios';

import { CONFIG } from './config';
import { addTokenBeforeRequest, refreshToken } from './interceptors';

/** Pre-configured axios instance. */
export const httpClient: AxiosInstance = axios.create({
  baseURL: CONFIG.apiUrl,
  headers: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Api-Key': CONFIG.apiKey,
  },
});

httpClient.interceptors.request.use(addTokenBeforeRequest, refreshToken);
httpClient.interceptors.response.use(response => response, refreshToken);
