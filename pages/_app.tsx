import "@/styles/globals.css";
import { NextIntlProvider } from "next-intl";
import { CookiesProvider } from "react-cookie";
import type { AppProps /*, AppContext */ } from "next/app";
import { useProgress } from "@/hooks/useProgress";

function MyApp({ Component, pageProps }: AppProps) {
  useProgress();

  return (
    <NextIntlProvider messages={pageProps.messages}>
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </NextIntlProvider>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp;
