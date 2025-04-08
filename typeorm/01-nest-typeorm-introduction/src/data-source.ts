// src/data-source.ts
import { DataSource, DataSourceOptions } from 'typeorm';
const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'yourpassword',
  database: 'users_db',
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  migrationsTableName: 'banking_migrations',
});
export default AppDataSource;
