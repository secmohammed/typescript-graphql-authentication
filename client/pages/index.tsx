import Link from "next/link";
import * as React from "react";
import { graphql } from "react-apollo";
import Layout from "../components/Layout";
import FORGOT_PASSWORD_MUTATION from "../graphql/user/mutations/forgotPassword";
const IndexPage: React.FunctionComponent = ({ mutate }: any) => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>hello Next.js 👋</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
      <button
        onClick={async () => {
          const response = await mutate({
            variables: {
              email: "mohammedosama@ieeed.org"
            }
          });
          console.log(response);
        }}
      >
        call login mutation
      </button>
    </Layout>
  );
};

export default graphql(FORGOT_PASSWORD_MUTATION)(IndexPage);
