"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_validator_1 = require("../validators/auth.validator");
const auth_controller_1 = require("../controllers/auth/auth.controller");
const auth_1 = require("../middlewares/auth");
const validate_1 = __importDefault(require("../validators/validate"));
const router = (0, express_1.Router)();
router.post("/login", (0, validate_1.default)(auth_validator_1.authValidator.login), auth_controller_1.authController.login);
router.post("/refresh-access-token", (0, validate_1.default)(auth_validator_1.authValidator.refreshAccessToken), auth_controller_1.authController.refreshAccessToken);
router.delete("/logout", auth_1.authenticate, auth_controller_1.authController.logout);
exports.default = router;
