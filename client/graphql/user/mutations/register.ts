import { gql } from "apollo-boost";

export default gql`
    mutation Register($data: RegisterInput!) {
        register(data: $data) {
            firstName
        }
    }
`;
