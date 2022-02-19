import "normalize.css";
import "../styles/globals.scss";
import { AppProps, AppContext } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

const LO_UPDATE_ATTRACTION_DATA_KEY = "__needUpdateAttractionPage";

function useFirstProps(registerPathname: string, pageProps: any) {
  const router = useRouter();
  const cachePagePropsRef = useRef<any>(null);

  useEffect(() => {
    const firstLoadPage = router.pathname;
    if (firstLoadPage !== "/attractions") {
      sessionStorage.setItem(LO_UPDATE_ATTRACTION_DATA_KEY, "true");
    } else {
      sessionStorage.removeItem(LO_UPDATE_ATTRACTION_DATA_KEY);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (router.pathname === registerPathname) {
    if (cachePagePropsRef.current === null) {
      cachePagePropsRef.current = pageProps;
    } else {
      // return cachePagePropsRef.current;
      return {
        ...pageProps,
        ...cachePagePropsRef.current,
      };
    }
  }
  return pageProps;
}

function MyApp({ Component, pageProps }: AppProps) {
  const modifiedPageProps = useFirstProps("/attractions", pageProps);
  // console.log(modifiedPageProps);

  return (
    <>
      <Head>
        <title>Taiwan° Tourguide</title>
      </Head>
      <Component {...modifiedPageProps} />
    </>
  );
}

MyApp.getInitialProps = async ({ Component, ctx, router }: AppContext) => {
  let pageProps = {};

  // console.log(`Run MyApp.getInitialProps`);
  // console.log(`ctx.req: ${ctx.req}`);
  // console.log(`router.pathname: ${router.pathname}`);
  // console.log(`router.route: ${router.route}`);
  // console.log(`_inFlightRoute: ${router._inFlightRoute}`);

  if (Component.getInitialProps) {
    if (router._inFlightRoute === "/attractions" && !ctx.req) {
      const needUpdate =
        sessionStorage.getItem(LO_UPDATE_ATTRACTION_DATA_KEY) !== null;
      if (needUpdate) {
        pageProps = await Component.getInitialProps(ctx);
        sessionStorage.removeItem(LO_UPDATE_ATTRACTION_DATA_KEY);
      }
    } else {
      pageProps = await Component.getInitialProps(ctx);
    }
  }
  return { pageProps };
};

export default MyApp;
