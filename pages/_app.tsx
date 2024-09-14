import Footer from '@/components/@shared/footer/Footer';
import Header from '@/components/@shared/header/Header';
import Providers from '@/contexts/Providers';
import '@/styles/globals.scss';
import '@/styles/quillCustom.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Providers>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </Providers>
    </>
  );
}
