import { Request, Response } from 'express';

import { BaseController } from "@config/controller";
import { service } from "@config/service";
import { UsersService } from "src/features/users/services/users.service";
import { User } from '@features/users/entities/user.entity';

export class UsersController extends BaseController {
  private readonly usersService: UsersService;

  constructor() {
    super();
    this.usersService = service(UsersService);
  }

  public createUser = async (req: Request, res: Response): Promise<void> => {
    const userPayload = new User(req.body);
    const [user, error] = await this.usersService.createUser(userPayload);

    res.json({ 'result': user ?? error });
  }
}