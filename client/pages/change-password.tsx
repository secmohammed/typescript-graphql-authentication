import { Field, Formik } from "formik";
import { NextContext } from "next";
import Router from "next/router";
import React from "react";
import { InputField } from "../components/fields/InputField";
import Layout from "../components/Layout";
import { ChangePasswordComponent } from "../generated/apolloComponents";
import { Button, Icon } from "react-materialize";

const ChangePassword = ({ token }: { token: string }) => {
  return (
    <Layout title="Change Password page">
      <ChangePasswordComponent>
        {changePassword => (
          <Formik
            onSubmit={async data => {
              const response = await changePassword({
                variables: {
                  data: {
                    password: data.password,
                    token
                  }
                }
              });
              console.log(response);
              Router.push("/");
            }}
            initialValues={{
              password: ""
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="password"
                  placeholder="password"
                  component={InputField}
                  type="password"
                />
                <Button type="submit" flat waves="light">
                  Change Password <Icon right>send</Icon>
                </Button>
              </form>
            )}
          </Formik>
        )}
      </ChangePasswordComponent>
    </Layout>
  );
};

ChangePassword.getInitialProps = ({
  query: { token }
}: NextContext<{ token: string }>) => {
  return {
    token
  };
};

export default ChangePassword;
