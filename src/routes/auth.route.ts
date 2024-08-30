import { Router } from "express";
import { authValidator } from "../validators/auth.validator";
import { authController } from "../controllers/auth/auth.controller";
import { authenticate } from "../middlewares/auth";
import validate from "../validators/validate";

const router = Router();

router.post("/login", validate(authValidator.login), authController.login);

router.post(
  "/refresh-access-token",
  validate(authValidator.refreshAccessToken),
  authController.refreshAccessToken
);

router.delete("/logout", authenticate, authController.logout);

export default router;
