import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../entity/user"

export const db = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: true,
    entities: [__dirname + '/../entity/*.{js,ts}'],
    migrations: [],
    subscribers: [],
})
