module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'joala',
  password: 'dkfk5377',
  database: 'postgres',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
