export class AppError extends Error {
  public readonly statusCode: number;

  public readonly code: string;

  public constructor(
    statusCode: number,
    message: string,
    code = "APPLICATION_ERROR",
  ) {
    super(message);

    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = code;

    Error.captureStackTrace(this, AppError);
  }
}