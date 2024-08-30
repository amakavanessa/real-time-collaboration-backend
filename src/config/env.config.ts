if (
  process.env.NODE_ENV === undefined ||
  process.env.HOST === undefined ||
  process.env.PORT === undefined ||
  process.env.DATABASE_URL === undefined ||
  process.env.USER === undefined ||
  process.env.PASSWORD === undefined ||
  process.env.DB_HOST === undefined ||
  process.env.DB_PORT === undefined ||
  process.env.DATABASE === undefined ||
  process.env.DB_DIALECT === undefined ||
  process.env.DB_PROTOCOL === undefined ||
  process.env.SMTP_HOST === undefined ||
  process.env.SMTP_PORT === undefined ||
  process.env.SMTP_USER === undefined ||
  process.env.SMTP_PASSWORD === undefined
) {
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

export default env;
