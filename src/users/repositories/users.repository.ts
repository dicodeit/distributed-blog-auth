import { database, Database } from "@config/database";
import { BaseRepository } from "@config/repository";
import { User } from "@users/entities/user.entity";

export class UsersRepository extends BaseRepository<User> {
  constructor(database: Database) {
    super(User, database);
  }
}

export const usersRepository = new UsersRepository(database('default'));