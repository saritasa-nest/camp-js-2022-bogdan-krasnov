import axios from 'axios';

/** Prepared data for axios. */
export const apiAnime =
 axios.create({
   baseURL: import.meta.env.VITE_API_BASE,
   headers: {
     // eslint-disable-next-line @typescript-eslint/naming-convention
     'Api-Key': import.meta.env.VITE_API_KEY,
   },
 });
