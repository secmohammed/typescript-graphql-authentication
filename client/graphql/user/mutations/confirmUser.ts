import { gql } from "apollo-boost";

export default gql`
    mutation ConfirmUser($token: String!) {
        confirmUser(token: $token)
    }
`;
