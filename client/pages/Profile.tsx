import React from "react";
import ME_QUERY from "../graphql/user/queries/me";
import { graphql } from "react-apollo";
import Layout from "../components/Layout";
export default graphql(ME_QUERY)(({ data: { me } }: any) => {
    return (
        <Layout title="profile page">
            <div> {me.firstName || "loading.."} </div>
        </Layout>
    );
});
