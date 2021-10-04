import { ReactNode } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  const { locale } = useRouter();

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>FLOWTRADITION</title>

        <meta name="description" content="Description" />
        <meta property="og:title" content="Title" />
        <meta property="og:description" content="Description" />
        <meta property="og:image" content="https://www.mywebsite.com/image.jpg" />
        <meta property="og:image:alt" content="Image alt" />
        <meta property="og:locale" content={locale} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:url" content="" />

        <link rel="icon" href="/favicon.ico" />
        {/* <!-- 32×32 -->*/}
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        {/*<!-- 512×512 -->*/}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/*<!-- 180×180 -->*/}
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#FF00FF" />
      </Head>
      {children}
    </>
  );
};
