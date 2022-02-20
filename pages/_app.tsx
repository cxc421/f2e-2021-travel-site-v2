import "normalize.css";
import "../styles/globals.scss";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { fetchAttractionsData, sleep } from "../utils/getPageData";

function useModifiedPageProps(registerPathname: string, pageProps: any) {
  const { pathname } = useRouter();
  const isRegisteredPage = pathname === registerPathname;
  const [registeredPageProps, setRegisteredPageProps] = useState<any>(null);
  const updatingRef = useRef(false);

  // console.log({ registeredPageProps });

  useEffect(() => {
    const needUpdate = !registeredPageProps || !registeredPageProps.isReady;

    if (needUpdate && !updatingRef.current) {
      console.log(`Fetch from hooks`);
      updatingRef.current = true;
      fetchAttractionsData()
        // sleep(5000)
        //   .then(() => fetchAttractionsData())
        .then((data) => {
          setRegisteredPageProps({
            ...data,
            isReady: true,
          });
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          updatingRef.current = false;
        });
    }
  }, [registeredPageProps, updatingRef]);

  if (isRegisteredPage) {
    if (registeredPageProps === null) {
      setRegisteredPageProps(pageProps);
      return pageProps;
    } else {
      return registeredPageProps;
    }
  } else {
    return pageProps;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const modifiedPageProps = useModifiedPageProps("/attractions", pageProps);
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

export default MyApp;
