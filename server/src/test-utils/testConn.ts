import { createConnection } from "typeorm";
export const testConn = (dropSchema: boolean = false) => {
    return createConnection({
        name: "default",
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "mohammed",
        password: "root",
        database: "type-graphql-auth-test",
        synchronize: true,
        dropSchema,
        entities: [__dirname + "/../entity/*.*"]
    });
};
