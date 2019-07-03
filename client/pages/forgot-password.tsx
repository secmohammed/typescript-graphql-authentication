import React from "react";
import Layout from "../components/Layout";
import { Formik, Field } from "formik";
import { graphql } from "react-apollo";
import Router from "next/router";
import { Button, Icon } from "react-materialize";

import FORGOT_PASSWORD_MUTATION from "../graphql/user/mutations/forgotPassword";
import { InputField } from "../components/fields/inputField";
export default graphql(FORGOT_PASSWORD_MUTATION)(({ mutate }: any) => {
    return (
        <Layout title="forgot password page">
            <Formik
                onSubmit={async data => {
                    const response = await mutate({
                        variables: data
                    });
                    console.log(response);
                    Router.push("/check-email");
                }}
                initialValues={{
                    email: ""
                }}
            >
                {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <Field
                            name="email"
                            placeholder="email"
                            component={InputField}
                        />
                        <Button type="submit" flat waves="light">
                            Register <Icon right>send</Icon>
                        </Button>
                    </form>
                )}
            </Formik>
        </Layout>
    );
});
