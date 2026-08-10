import type {
  Request,
  Response,
} from "express";

import type { AuthCredentials } from "./auth.types.js";
import {
  loginUser,
  signUpUser,
} from "./auth.service.js";

export async function signUp(
  request: Request,
  response: Response,
): Promise<void> {
  const credentials = request.body as AuthCredentials;

  const user = await signUpUser(credentials);

  response.status(201).json({
    user,
  });
}

export async function login(
  request: Request,
  response: Response,
): Promise<void> {
  const credentials = request.body as AuthCredentials;

  const result = await loginUser(credentials);

  response.status(200).json({
    access_token: result.accessToken,
    refresh_token: result.refreshToken,
    user: result.user,
  });
}