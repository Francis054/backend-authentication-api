import type {
  NextFunction,
  Request,
  Response,
} from "express";

import { AppError } from "../errors/app-error.js";
import type { AuthCredentials } from "../modules/auth/auth.types.js";

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function validateAuthBody(
  request: Request,
  _response: Response,
  next: NextFunction,
): void {
  const body: unknown = request.body;

  if (
    typeof body !== "object" ||
    body === null ||
    Array.isArray(body)
  ) {
    next(
      new AppError(
        400,
        "Request body must be a JSON object.",
        "INVALID_REQUEST_BODY",
      ),
    );

    return;
  }

  const possibleCredentials = body as Record<string, unknown>;

  if (!isNonEmptyString(possibleCredentials.email)) {
    next(
      new AppError(
        400,
        "Email is required.",
        "EMAIL_REQUIRED",
      ),
    );

    return;
  }

  if (!isNonEmptyString(possibleCredentials.password)) {
    next(
      new AppError(
        400,
        "Password is required.",
        "PASSWORD_REQUIRED",
      ),
    );

    return;
  }

  const credentials: AuthCredentials = {
    email: possibleCredentials.email.trim().toLowerCase(),
    password: possibleCredentials.password,
  };

  request.body = credentials;

  next();
}