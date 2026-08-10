import type {
  Session,
  User,
} from "@supabase/supabase-js";

import { createSupabaseClient } from "../../config/supabase.js";
import { AppError } from "../../errors/app-error.js";
import type { AuthCredentials } from "./auth.types.js";

interface LoginResult {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export async function signUpUser(
  credentials: AuthCredentials,
): Promise<User> {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
  });

  if (error) {
    throw new AppError(
      400,
      error.message,
      "AUTH_SIGNUP_FAILED",
    );
  }

  if (!data.user) {
    throw new AppError(
      500,
      "Supabase did not return the created user.",
      "AUTH_USER_NOT_RETURNED",
    );
  }

  return data.user;
}

export async function loginUser(
  credentials: AuthCredentials,
): Promise<LoginResult> {
  const supabase = createSupabaseClient();

  const { data, error } =
    await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

  if (error) {
    throw new AppError(
      401,
      "Invalid login credentials",
      "AUTH_INVALID_CREDENTIALS",
    );
  }

  const session: Session | null = data.session;

  if (!session) {
    throw new AppError(
      401,
      "Invalid login credentials",
      "AUTH_SESSION_NOT_CREATED",
    );
  }

  return {
    accessToken: session.access_token,
    refreshToken: session.refresh_token,
    user: data.user,
  };
}