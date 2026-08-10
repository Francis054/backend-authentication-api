import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";

import { AppError } from "../errors/app-error.js";
import { env } from "../config/env.js";

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction,
): void => {
  if (error instanceof AppError) {
    response.status(error.statusCode).json({
      error: error.message,
      code: error.code,
    });

    return;
  }

  console.error("Unexpected application error:", error);

  response.status(500).json({
    error: "Internal server error",
    ...(env.nodeEnv === "development" && error instanceof Error
      ? { details: error.message }
      : {}),
  });
};