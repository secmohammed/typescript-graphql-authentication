import { gql } from "apollo-boost";

export default gql`
    mutation ChangePassword($data: ChangePasswordInput!) {
        changePassword(data: $data) {
            firstName
            lastName
            email
        }
    }
`;
