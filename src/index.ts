import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';

import { DefaultDataSource } from '@config/data-source';
import { database } from '@config/database';
import { USERS_ROUTES_PREFIX, usersRouter } from '@users/users.routes';
import { env, ENV_VARIABLES } from '@config/env';

const app = express();
app.use(express.json());

app.use(USERS_ROUTES_PREFIX, usersRouter);

const defaultDatabase = database('default', DefaultDataSource);
defaultDatabase.initialize({
  success: () => {
    const port = env<number>(ENV_VARIABLES.SERVER_PORT, 3000);
    app.listen(port, (err) => {
      if (err) {
        console.error('Unable to initialize server', err);
        process.exit(-1);
      }

      console.log(`Server listening at: http://localhost:${port}/`)
    });
  }
})