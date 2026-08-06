import { app } from "./app.js";
import { env } from "./config/env.js";

async function checkSupabaseConnection(): Promise<void> {
  const healthUrl = new URL(
    "/auth/v1/health",
    env.supabaseUrl,
  );

  const response = await fetch(healthUrl, {
    headers: {
      apikey: env.supabaseKey,
    },
    signal: AbortSignal.timeout(5_000),
  });

  if (!response.ok) {
    throw new Error(
      `Supabase health check failed with status ${response.status}.`,
    );
  }
}

async function startServer(): Promise<void> {
  try {
    await checkSupabaseConnection();

    app.listen(env.port, () => {
      console.log(
        `Server running on http://localhost:${env.port} and connected to Supabase.`,
      );
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unknown startup error occurred.";

    console.error(
      "Failed to start the application:",
      errorMessage,
    );

    process.exit(1);
  }
}

void startServer();