export enum ENV_VARIABLES {
  SERVER_PORT = 'SERVER_PORT',
  DATABASE_DRIVER = 'DATABASE_DRIVER',
  DATABASE_HOST = 'DATABASE_HOST',
  DATABASE_PORT = 'DATABASE_PORT',
  DATABASE_USERNAME = 'DATABASE_USERNAME',
  DATABASE_PASSWORD = 'DATABASE_PASSWORD',
  DATABASE_NAME = 'DATABASE_NAME'
}

export const env = <T>(key: string, defaultValue: T = null as unknown as T): T => {
  const value = process.env[key.toUpperCase()];

  return (value as unknown as T) ?? defaultValue;
};
