import { Router } from "express";
import { userValidator } from "../validators/user.validator";
import { userController } from "../controllers/user/user.controller";
import { authenticate } from "../middlewares/auth";
import validate from "../validators/validate";

const router = Router();

router.post("/", validate(userValidator.register), userController.register);
router.put("/verify-email/:token", userController.verifyEmail);

router.get("/:id", authenticate, userController.getUser);

router.post(
  "/reset-password",
  validate(userValidator.resetPassword),
  userController.resetPassword
);

router.put(
  "/password/:token",
  validate(userValidator.confirmResetPassword),
  userController.confirmResetPassword
);
export default router;
