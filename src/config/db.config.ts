import { Sequelize } from "sequelize-typescript";
import env from "./env.config";

const sequelize =
  env.NODE_ENV === "test" || env.NODE_ENV === "development"
    ? new Sequelize(env.DATABASE, env.DB_USER, env.DB_PASSWORD, {
        host: env.DB_HOST,
        dialect: env.DB_DIALECT,
        logging: false,
      })
    : new Sequelize(env.DATABASE_URL, {
        dialect: env.DB_DIALECT,
        protocol: env.DB_PROTOCOL,
        dialectOptions: {},
        logging: false,
      });

export default sequelize;
