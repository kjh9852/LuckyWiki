import Header from '@/components/@shared/Header';
import Providers from '@/contexts/Providers';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Header />
      <Component {...pageProps} />
    </Providers>
  );
}
