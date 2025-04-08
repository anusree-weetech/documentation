export const typeormConfig = {
  type: 'postgres',
  host: 'localhost',
//   port: 5432,
  username: 'postgres',
  password: 'yourpassword',
  database: 'users_db',
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
};
