import "/styles/globals.css";
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
      <GlobalSettingsProvider>
        <Component {...pageProps} />
        <Layout />
      </GlobalSettingsProvider>
    </>
  );
}