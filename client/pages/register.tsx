import React from "react";
import Layout from "../components/Layout";
import { Formik, Field } from "formik";
import { graphql } from "react-apollo";
import REGISTER_MUTATION from "../graphql/user/mutations/register";
import { InputField } from "../components/fields/inputField";
import { Button, Icon } from "react-materialize";
import { RegisterInput } from "../generated/apolloComponents";
export default graphql(REGISTER_MUTATION)(({ mutate }: any) => {
    let formInitialValues: RegisterInput = {
        email: "",
        firstName: "",
        lastName: "",
        password: ""
    };
    return (
        <Layout title="register page">
            <Formik
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={async (data, { setErrors }) => {
                    try {
                        const response = await mutate({
                            variables: {
                                data
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
                            name="firstName"
                            placeholder="your first name."
                            component={InputField}
                        />
                        <Field
                            name="lastName"
                            placeholder="your last name."
                            component={InputField}
                        />
                        <Field
                            name="password"
                            type="password"
                            placeholder="your password."
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
