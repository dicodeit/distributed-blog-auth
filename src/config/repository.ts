import { EntityTarget, ObjectLiteral, Repository } from "typeorm";
import { database, Database, DatabaseKeys } from "src/config/database";

type RepositoriesType = Map<EntityTarget<ObjectLiteral>, BaseRepository<any>>;

const dbRepositories = new Map<DatabaseKeys, RepositoriesType>;

export class BaseRepository<Entity extends ObjectLiteral> extends Repository<Entity> {
  constructor(entity: EntityTarget<Entity>, database: Database) {
    super(entity, database.manager)
  }
}

export const repository = <T extends BaseRepository<any>>(
  RepositoryClass: new (...args: any[]) => T,
  databaseKey: DatabaseKeys = 'default',
): T => {
  let repositories = null;

  if (!dbRepositories.has(databaseKey)) {
    repositories = new Map<EntityTarget<ObjectLiteral>, T>;
    dbRepositories.set(databaseKey, repositories);
  }

  let repository = null;

  if (!repositories?.has(RepositoryClass)) {
    const db = database(databaseKey);
    repository = new RepositoryClass(db);
    repositories?.set(RepositoryClass, repository);
  }

  if (repository === null) {
    throw Error(`Unable to create repository for class ${RepositoryClass.name}`);
  }

  return repository;
}