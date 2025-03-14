import { Database } from "@config/database";
import { ClientError } from "@config/errors";
import { BaseRepository } from "@config/repository";
import { Optional } from "@config/types";
import { User } from "@features/users/entities/user.entity";
import { QueryFailedError } from "typeorm";

export class UsersRepository extends BaseRepository<User> {
  constructor(database: Database) {
    super(User, database);
  }

  public saveUser = async (user: User): Promise<[Optional<User>, Optional<Error>]> => {
    try {
      const savedUser = await this.save(user);
      return [savedUser, null];
    } catch (err) {
      if (err instanceof QueryFailedError) {
        const queryError = err as any;

        if (queryError.code === '23505') return [null, new ClientError('users.errors.duplicate')];
      }

      return [null, err as Error];
    }
  }
}
