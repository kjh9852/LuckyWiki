import axios from 'axios';
// eslint-disable-next-line no-undef
export const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'https://wikied-api.vercel.app/8-7';

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    accept: 'application/json',
  },
});

export default instance;
