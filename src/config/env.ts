import "dotenv/config";

const requiredEnvironmentVariables = [
  "SUPABASE_URL",
  "SUPABASE_PUBLISHABLE_KEY",
] as const;

for (const variableName of requiredEnvironmentVariables) {
  if (!process.env[variableName]) {
    throw new Error(
      `Missing required environment variable: ${variableName}`,
    );
  }
}

const port = Number.parseInt(process.env.PORT ?? "3000", 10);

if (Number.isNaN(port)) {
  throw new Error("PORT must be a valid integer.");
}

if (port < 1 || port > 65_535) {
  throw new Error("PORT must be between 1 and 65535.");
}

export const env = Object.freeze({
  nodeEnv: process.env.NODE_ENV ?? "development",
  port,
  supabaseUrl: process.env.SUPABASE_URL as string,
  supabaseKey: process.env.SUPABASE_PUBLISHABLE_KEY as string,
});