"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
if (process.env.USER === undefined) {
    throw new Error("Environment variables missing.");
}
const env = {
    NODE_ENV: process.env.NODE_ENV,
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    DB_USER: process.env.USER,
    DB_PASSWORD: process.env.PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.PORT,
    DATABASE: process.env.DATABASE,
    DB_DIALECT: process.env.DB_DIALECT,
    DB_PROTOCOL: process.env.DB_PROTOCOL,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
};
exports.default = env;
