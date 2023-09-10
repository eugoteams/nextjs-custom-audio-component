/** @format */

import ErrorBoundry from "@/Component/ErrorBoundry";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <ErrorBoundry>
        <Component {...pageProps} />
      </ErrorBoundry>
    </>
  );
}
