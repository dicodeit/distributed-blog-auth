import { repository } from "@config/repository";
import { BaseService } from "@config/service";
import { User } from '@users/entities/user.entity';
import { UsersRepository } from "@users/repositories/users.repository";

export class UsersService extends BaseService {
  private readonly usersRepository: UsersRepository;

  constructor() {
    super();
    this.usersRepository = repository(UsersRepository);
  }

  public async createUser(payload: User): Promise<[Error | null, User | null]> {
    const [user, error] = await this.usersRepository.saveUser(payload);

    if (error) {
      return [null, error]
    }

    return user.id;
  }
}

