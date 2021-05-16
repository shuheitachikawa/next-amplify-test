import "src/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp(props: AppProps) {
  return (
    <>
      <props.Component {...props.pageProps} />
    </>
  );
}

export default MyApp;
