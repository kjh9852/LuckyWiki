import Footer from '@/components/@shared/footer/Footer';
import Header from '@/components/@shared/header/Header';
import Providers from '@/contexts/Providers';
import '@/styles/globals.scss';
import '@/styles/quillCustom.scss';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Providers>
  );
}
