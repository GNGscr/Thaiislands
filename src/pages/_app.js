import "/styles/globals.css";
import Head from "next/head";
import SideNavigationWrapper from "../components/layout/SideNavigationWrapper";
import Script from "next/script";
import GlobalSettingsProvider from "../components/global/GlobalSettings";

export default function App({ Component, pageProps }) {

  const NEXT_PUBLIC_GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Discover Koh Phangan – the perfect island for beaches, parties, and culture in Thailand. Everything you need to know for your trip." />
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
            strategy="afterInteractive"
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
          >
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
            `}
          </Script>
        </>
      )}
      <GlobalSettingsProvider>
        <Component {...pageProps} />
        <SideNavigationWrapper />
      </GlobalSettingsProvider>
    </>
  );
}