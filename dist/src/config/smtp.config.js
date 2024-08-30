"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = require("nodemailer");
const env_config_1 = __importDefault(require("./env.config"));
const transporter = (0, nodemailer_1.createTransport)({
    port: env_config_1.default.SMTP_PORT,
    host: env_config_1.default.SMTP_HOST,
    auth: {
        user: env_config_1.default.SMTP_USER,
        pass: env_config_1.default.SMTP_PASSWORD,
    },
});
exports.default = transporter;
