import { gql } from "apollo-boost";

export default gql`
    mutation ForgotPassword($email: String!) {
        forgotPassword(email: $email)
    }
`;
