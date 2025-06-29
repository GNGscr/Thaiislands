import "/styles/globals.css";
import Head from "next/head";
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from "./components/Layout";
import GlobalSettingsProvider from "./components/GlobalSettings";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  
  useEffect(() => {
    if (router.pathname === '') {
      router.push('/about');
    }
    if (router.pathname === '/') {
      router.push('/about');
    }
  }, [router]);
  
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Discover Koh Phangan – the perfect island for beaches, parties, and culture in Thailand. Everything you need to know for your trip." />
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalSettingsProvider>
        <Component {...pageProps} />
        <Layout />
      </GlobalSettingsProvider>
    </>
  );
}