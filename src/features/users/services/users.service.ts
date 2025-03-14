import { repository } from "@config/repository";
import { BaseService } from "@config/service";
import { Optional } from "@config/types";
import { User } from '@features/users/entities/user.entity';
import { UsersRepository } from "@features/users/repositories/users.repository";

type nullable = undefined | null;

export class UsersService extends BaseService {
  private readonly usersRepository: UsersRepository;

  constructor() {
    super();
    this.usersRepository = repository(UsersRepository);
  }

  public createUser = async (payload: User): Promise<[Optional<User>, Optional<Error>]> => {
    const [user, error] = await this.usersRepository.saveUser(payload);

    if (error) {
      return [null, error]
    }

    return [user, null];
  }
}

