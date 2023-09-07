/** @format */
import Document, { Head, Html, Main, NextScript } from "next/document";
import { createGetInitialProps } from "@mantine/next";

const getInitialProps = createGetInitialProps();
export default class _Document extends Document {
  static getInitialProps = getInitialProps;
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// import { Html, Head, Main, NextScript } from "next/document";
// import { createGetInitialProps } from "@mantine/next";

// const getInitialProps = createGetInitialProps();
// export default function Document() {
//   static getInitialProps = getInitialProps;
//   return (
//     <Html lang="en">
//       <Head />
//       <body>
//         <Main />
//         <NextScript />
//       </body>
//     </Html>
//   );
// }
