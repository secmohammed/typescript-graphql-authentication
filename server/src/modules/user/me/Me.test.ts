import { Connection } from "typeorm";
import faker from "faker";

import { testConn } from "../../../test-utils/testConn";
import { mockedGraphQL as graphql } from "../../../test-utils/helpers";
import { User } from "../../../entity/User";

let conn: Connection;
beforeAll(async () => {
    conn = await testConn();
});
afterAll(async () => {
    await conn.close();
});

const meQuery = `
{
    me {
        id
        firstName
        lastName
        email
        name
    }
}
`;

describe("Me", () => {
    it("get user", async () => {
        const user = await User.create({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        }).save();
        const response = await graphql({
            source: meQuery,
            userId: user.id
        });
        expect(response).toMatchObject({
            data: {
                me: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                }
            }
        });
    });
    it("return null", async () => {
        const response = await graphql({
            source: meQuery
        });
        expect(response).toMatchObject({
            data: {
                me: null
            }
        });
    });
});
