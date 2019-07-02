import React from "react";
import Layout from "../components/Layout";
import { Formik, Field } from "formik";
import { graphql } from "react-apollo";
import LOGIN_MUTATION from "../graphql/user/mutations/login";
import { InputField } from "../components/fields/inputField";
import { Button, Icon } from "react-materialize";
import { LoginInput } from "../generated/apolloComponents";
export default graphql(LOGIN_MUTATION)(({ mutate }: any) => {
    let formInitialValues: LoginInput = {
        email: "",
        password: ""
    };
    return (
        <Layout title="register page">
            <Formik
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={async ({ email, password }, { setErrors }) => {
                    try {
                        const response = await mutate({
                            variables: {
                                email,
                                password
                            }
                        });
                        console.log(response);
                    } catch (err) {
                        const errors: { [key: string]: string } = {};
                        err.graphQLErrors[0].extensions.exception.validationErrors.forEach(
                            (validationError: any) => {
                                Object.values(
                                    validationError.constraints
                                ).forEach((message: any) => {
                                    errors[validationError.property] = message;
                                });
                            }
                        );
                        setErrors(errors);
                    }
                }}
                initialValues={formInitialValues}
            >
                {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <Field
                            name="email"
                            placeholder="your email."
                            type="email"
                            component={InputField}
                        />
                        <Field
                            name="password"
                            type="password"
                            placeholder="your password."
                            component={InputField}
                        />
                        <Button type="submit" flat waves="light">
                            Login <Icon right>send</Icon>
                        </Button>
                    </form>
                )}
            </Formik>
        </Layout>
    );
});
