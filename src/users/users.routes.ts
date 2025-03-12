import express from 'express';

import { controller } from '@config/controller';
import { UsersController } from '@users/controllers/users.controllers';

export const USERS_ROUTES_PREFIX = 'users';

export const usersRouter = express.Router({ mergeParams: true });
const usersController = controller(UsersController);

usersRouter.post('', usersController.createUser);
