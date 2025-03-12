import express from 'express';

import { controller } from '@config/controller';
import { UsersController } from '@features/users/controllers/users.controllers';

const usersController = controller(UsersController);

export const USERS_ROUTES_PREFIX = '/users';

export const usersRouter = express.Router({ mergeParams: true });

usersRouter.post('/', usersController.createUser);
