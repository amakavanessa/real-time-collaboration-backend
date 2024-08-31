const invalidCredential: Array<ResponseMessage> = [
  {
    msg: "Your email or password is incorrect",
  },
];

const emailNotVerified: Array<ResponseMessage> = [
  {
    msg: "Please verify your email before logging in",
  },
];

const resetPassword: Array<ResponseMessage> = [
  {
    msg: "if a user with that email exists, you will receive email instructions to reset your password",
  },
];

const userNotFound: Array<ResponseMessage> = [
  {
    msg: "User not found",
  },
];

export { userNotFound, emailNotVerified, resetPassword, invalidCredential };
