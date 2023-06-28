import Head from "next/head";
import "bootstrap/dist/css/bootstrap.css";
import "@/styles/globals.css";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Challenge (evolvemediallc)</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
