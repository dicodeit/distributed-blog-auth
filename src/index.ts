import "reflect-metadata";
import "dotenv/config";

import express from "express";
import helmet from "helmet";
import cors from 'cors';

import { DefaultDataSource } from "@config/data-source";
import { database } from "@config/database";
import { env, ENV_VARIABLES } from "@config/env";
import { logger } from "@config/logger";
import rateLimit from "express-rate-limit";



const PORT = env<number>(ENV_VARIABLES.SERVER_PORT, 3000);
const defaultDatabase = database("default", DefaultDataSource);
const app = express();
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
}))
app.use(express.json());
app.use(logger());
app.use(helmet());
app.use(cors())

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
