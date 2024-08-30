import { Dialect } from "sequelize";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: "test" | "development" | "production";
      HOST?: string;
      PORT?: string;
      DATABASE_URL: string;
      DB_USER: string;
      DB_PASSWORD?: string;
      DB_HOST: string;
      DB_PORT: string;
      DATABASE: string;
      DB_DIALECT?: Dialect;
      DB_PROTOCOL?: string;
      SMTP_HOST?: string;
      SMTP_PORT?: number;
      SMTP_USER?: string;
      SMTP_PASSWORD?: string;
    }
  }
}

export {};
