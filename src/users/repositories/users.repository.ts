import { Database } from "@config/database";
import { BaseRepository } from "@config/repository";
import { User } from "@users/entities/user.entity";

export class UsersRepository extends BaseRepository<User> {
  constructor(database: Database) {
    super(User, database);
  }

  public async saveUser(user: User) {
    return this.save(user)
      .then(user => [user, null])
      .catch(error => [null, error]);
  }
}
