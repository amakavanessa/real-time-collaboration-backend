import { createTransport } from "nodemailer";

import env from "./env.config";

const transporter = createTransport({
  port: env.SMTP_PORT,
  host: env.SMTP_HOST,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASSWORD,
  },
});

export default transporter;
