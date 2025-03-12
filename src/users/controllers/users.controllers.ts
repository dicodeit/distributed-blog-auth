import { BaseController } from "@config/controller";

export class UsersController extends BaseController {
  constructor() {
    super();
  }

  public createUser(req, res) {
    if (!req.body) {

    }
  }
}

export const usersController = new UsersController();