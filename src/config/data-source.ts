import { DataSource } from "typeorm";
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const DefaultDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "test",
  synchronize: true,
  logging: false,
  entities: [path.resolve(__dirname, "../src/**/*.entity.{js,ts}")],
  migrations: [path.resolve(__dirname, "../database/migrations/**/*.{js,ts}")],
  subscribers: [],
});
