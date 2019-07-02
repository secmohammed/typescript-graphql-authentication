import React from "react";
import CONFIRM_USER_MUTATION from "../graphql/user/mutations/confirmUser";
import redirect from "../lib/redirect";
import { MyContext } from "../interfaces/MyContext";
import {
    ConfirmUserMutation,
    ConfirmUserVariables
} from "../generated/apolloComponents";
export default class Confirm extends React.PureComponent {
    static async getInitialProps({
        query: { token },
        apolloClient,
        ...ctx
    }: MyContext) {
        if (!token) {
            return {};
        }
        await apolloClient.mutate<ConfirmUserMutation, ConfirmUserVariables>({
            mutation: CONFIRM_USER_MUTATION,
            variables: {
                token: token as string
            }
        });
        redirect(ctx, "/login");
        return {};
    }
    render() {
        console.log(this.props);
        return <div>hi</div>;
    }
}
