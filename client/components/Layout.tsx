import * as React from "react";
import Head from "next/head";
import NavigationBar from "./partials/NavigationBar";
type Props = {
  title?: string;
};
import { Footer } from "react-materialize";
const Layout: React.FunctionComponent<Props> = ({
  children,
  title = "This is the default title"
}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js" />

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
      />

      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <NavigationBar />
    </header>
    {children}
    <Footer copyrights="&copy 2015 Copyright Text" className="teal">
      <h5 className="white-text">Footer Content</h5>
      <p className="grey-text text-lighten-4">
        You can use rows and columns here to organize your footer content.
      </p>
    </Footer>
  </div>
);

export default Layout;
