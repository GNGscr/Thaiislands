import "@/styles/globals.css";
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from "./components/Layout";
import GlobalSettingsProvider from "./components/GlobalSettings";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  
  useEffect(() => {
    if (router.pathname === '') {
      router.push('/about-us');
    }
    if (router.pathname === '/') {
      router.push('/about-us');
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


// import React from 'react';
// import GlobalSettingsProvider from './GlobalSettings'; // Path to the updated file
// import YourComponent from './YourComponent';

// const App = () => {
//   return (
//     <GlobalSettingsProvider>
//       <YourComponent />
//     </GlobalSettingsProvider>
//   );
// };

// export default App;
