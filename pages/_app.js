import "@/styles/globals.css";
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from "./components/Layout";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  console.log(router.pathname === '/');

  
  useEffect(() => {
    if (router.pathname === '/') {
      router.push('/about-us');
    }
  }, [router]);
  
  return (
    <>
      <Component {...pageProps} />
      <Layout />
    </>
  );
}
