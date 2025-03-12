import { Request, Response } from 'express';

import { BaseController } from "@config/controller";
import { service } from "@config/service";
import { UsersService } from "@users/services/users.service";
import { User } from '@users/entities/user.entity';

export class UsersController extends BaseController {
  private readonly usersService: UsersService;

  constructor() {
    super();
    this.usersService = service(UsersService);
  }

  public createUser(req: Request, res: Response) {
    const user = new User(req.body);
    this.usersService.createUser(user);
  }
}