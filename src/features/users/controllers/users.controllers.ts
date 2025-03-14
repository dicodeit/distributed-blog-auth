import { Request, Response } from 'express';

import { BaseController } from "@config/controller";
import { service } from "@config/service";
import { UsersService } from "@features/users/services/users.service";
import { User } from '@features/users/entities/user.entity';
import { ClientError, HttpError } from '@config/errors';

export class UsersController extends BaseController {
  private readonly usersService: UsersService;

  constructor() {
    super();
    this.usersService = service(UsersService);
  }

  public createUser = async (req: Request, res: Response) => {
    const userPayload = new User(req.body);
    const [user, error] = await this.usersService.createUser(userPayload);

    if (error instanceof ClientError) {
      const httpError = new HttpError({
        statusCode: 400,
        error: error.message
      });

      return res.status(httpError.statusCode).json(httpError);
    }

    return res.status(201).json({ id: user!.id });
  }
}