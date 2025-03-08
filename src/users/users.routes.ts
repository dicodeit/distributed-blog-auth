import express from 'express';
export const USERS_ROUTES_PREFIX = 'users';

export const usersRouter = express.Router({ mergeParams: true });
