import { repository } from "@config/repository";
import { BaseService } from "@config/service";
import { UsersRepository } from "@users/repositories/users.repository";

export class UsersService extends BaseService {
  private readonly usersRepository: UsersRepository;

  constructor() {
    super();
    this.usersRepository = repository(UsersRepository);
  }
}

export const usersService = new UsersService();