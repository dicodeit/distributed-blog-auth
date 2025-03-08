import { BaseController } from "@config/controller";

export class UsersController extends BaseController {
  constructor() {
    super();
  }
}

export const usersController = new UsersController();