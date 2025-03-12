import { repository } from "@config/repository";
import { BaseService } from "@config/service";
import { User } from '@features/users/entities/user.entity';
import { UsersRepository } from "@features/users/repositories/users.repository";

export class UsersService extends BaseService {
  private readonly usersRepository: UsersRepository;

  constructor() {
    super();
    this.usersRepository = repository(UsersRepository);
  }

  public createUser = async (payload: User): Promise<[User | null, Error | null,]> => {
    const [user, error] = await this.usersRepository.saveUser(payload);

    if (error) {
      return [null, error]
    }

    return [user, null];
  }
}

