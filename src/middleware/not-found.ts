import type {
  NextFunction,
  Request,
  Response,
} from "express";

import { AppError } from "../errors/app-error.js";

export function notFound(
  request: Request,
  _response: Response,
  next: NextFunction,
): void {
  next(
    new AppError(
      404,
      `Route ${request.method} ${request.originalUrl} was not found.`,
      "ROUTE_NOT_FOUND",
    ),
  );
}