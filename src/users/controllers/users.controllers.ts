import { BaseController } from "@config/controller";

export class UsersController extends BaseController {
  constructor() {
    super();
  }

  public createUser(req, res) {

  }
}

export const usersController = new UsersController();