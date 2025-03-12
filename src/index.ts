import "reflect-metadata";
import "dotenv/config";

import express from "express";

import { DefaultDataSource } from "@config/data-source";
import { database } from "@config/database";
import { env, ENV_VARIABLES } from "@config/env";
import { logger } from "@config/logger";


const PORT = env<number>(ENV_VARIABLES.SERVER_PORT, 3000);
const defaultDatabase = database("default", DefaultDataSource);
const app = express();
app.use(logger());
app.use(express.json());

defaultDatabase?.initialize({
  success: async () => {
    // Lazy load usersRouter AFTER database is ready
    const { USERS_ROUTES_PREFIX, usersRouter } = await import("src/features/users/users.routes");
    app.use(USERS_ROUTES_PREFIX, usersRouter);

    app.listen(PORT, (err) => {
      if (err) {
        console.error("Unable to initialize server", err);
        process.exit(-1);
      }
      console.log(`Server listening at: http://localhost:${PORT}/`);
    });
  },
});
