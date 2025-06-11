import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <title>Thaiislands</title>
        <meta name="description" content="גלו את קו פנגן - האי המושלם לחופים, מסיבות ותרבות בתאילנד. כל מה שצריך לדעת על טיול לאי." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
