import { Router } from "express";
import { authenticate } from "../middlewares/auth";
import { documentController } from "../controllers/document/document.controller";
import { documentValidator } from "../validators/document.validator";
import { shareValidator } from "../validators/share.validator";
import { shareController } from "../controllers/document/share/share.controller";
import validate from "../validators/validate";

const router = Router();

router.get("/:token/:id", authenticate, documentController.getOneByToken);

router.get("/", authenticate, documentController.getAll);

router.put(
  "/:id",
  authenticate,
  validate(documentValidator.update),
  documentController.update
);

router.post("/", authenticate, documentController.create);

router.delete("/:id", authenticate, documentController.delete);

router.post(
  "/:id/share",
  authenticate,
  validate(shareValidator.create),
  shareController.create
);

router.delete(
  "/:documentId/share/:userId",
  authenticate,
  shareController.delete
);

export default router;
