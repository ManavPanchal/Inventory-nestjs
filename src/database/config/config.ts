import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { config } from 'dotenv';
config();

const configs: Record<string, SequelizeModuleOptions> = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'inventory',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: Number(process.env.DB_PORT) || 5432,
  },
};

export const sequelizeConfigOptions =
  configs[process.env.NODE_ENV || 'development'];
