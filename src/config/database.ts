import { DataSource, EntityManager } from "typeorm";

type InitializeActions = {
  success?: () => void,
  error?: (err: Error) => void
}

export class Database {
  private readonly _datasource: DataSource;
  private _manager: EntityManager | null;

  constructor(datasource: DataSource) {
    this._datasource = datasource;
    this._manager = null;
  }

  public async initialize(actions?: InitializeActions): Promise<void> {
    try {
      await this._datasource.initialize();
      this._manager = this._datasource.manager;
      actions?.success?.();
    } catch (err) {
      console.error("Unable to initialize datasource:", err);
      actions?.error?.(err as Error);
      process.exit(-1);
    }
  }

  public get datasource(): DataSource {
    return this._datasource;
  }

  public get manager(): EntityManager {
    if (!this._manager) {
      throw new Error('EntityManager must be initialized');
    }

    return this._manager;
  }
}

export const databases = {
  default: null as Database | null
};

export type DatabaseKeys = keyof typeof databases;

export const database = (databaseKey: DatabaseKeys, datasource: DataSource | null = null): Database => {
  if (datasource !== null) {
    databases[databaseKey] = new Database(datasource);
  }

  const db = databases[databaseKey];

  if (db === null) {
    throw new Error('Database is needed to perform operations');
  }

  return db;
}