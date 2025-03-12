import { Database } from "@config/database";
import { BaseRepository } from "@config/repository";
import { User } from "@features/users/entities/user.entity";

export class UsersRepository extends BaseRepository<User> {
  constructor(database: Database) {
    super(User, database);
  }

  public saveUser = async (user: User) => {
    return this.save(user)
      .then(user => [user, null])
      .catch(error => [null, error]);
  }
}
