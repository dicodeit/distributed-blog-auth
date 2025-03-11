
import { CreateUsersTable1741463724551 } from "../database/migrations/1741463724551-CreateUsersTable";
import { DataSource } from "typeorm";
import { env, ENV_VARIABLES } from "./env";

export const DefaultDataSource = new DataSource({
  type: 'postgres',
  host: env<string>(ENV_VARIABLES.DATABASE_HOST, 'localhost'),
  port: env<number>(ENV_VARIABLES.DATABASE_PORT, 5432),
  username: env<string>(ENV_VARIABLES.DATABASE_USERNAME, 'postgres'),
  password: env<string>(ENV_VARIABLES.DATABASE_PASSWORD, 'password'),
  database: env<string>(ENV_VARIABLES.DATABASE_HOST, 'auth'),
  synchronize: true,
  logging: false,
  entities: ["../**/*.entity.{js,ts}"],
  migrations: [CreateUsersTable1741463724551],
  subscribers: [],
});
