"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidCredential = exports.resetPassword = exports.emailNotVerified = exports.userNotFound = void 0;
const invalidCredential = [
    {
        msg: "Your email or password is incorrect",
    },
];
exports.invalidCredential = invalidCredential;
const emailNotVerified = [
    {
        msg: "Please verify your email before logging in",
    },
];
exports.emailNotVerified = emailNotVerified;
const resetPassword = [
    {
        msg: "if a user with that email exists, you will receive email instructions to reset your password",
    },
];
exports.resetPassword = resetPassword;
const userNotFound = [
    {
        msg: "User not found",
    },
];
exports.userNotFound = userNotFound;
