import { Router } from "express";

import { validateAuthBody } from "../../middleware/validate-auth-body.js";
import { asyncHandler } from "../../utils/async-handler.js";
import {
  login,
  signUp,
} from "./auth.controller.js";

export const authRouter = Router();

authRouter.post(
  "/signup",
  validateAuthBody,
  asyncHandler(signUp),
);

authRouter.post(
  "/login",
  validateAuthBody,
  asyncHandler(login),
);