import { body } from "express-validator";

class AuthValidator {
  public login = [
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Must provide a valid email address"),
    body("password").exists().withMessage("Password is required"),
  ];

  public refreshAccessToken = [
    body("token").exists().withMessage("Must provide a valid token."),
  ];
}

const authValidator = new AuthValidator();

export { authValidator };
