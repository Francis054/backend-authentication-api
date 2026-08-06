import express, {
  type Request,
  type Response,
} from "express";

export const app = express();

app.disable("x-powered-by");

app.use(express.json({ limit: "10kb" }));

app.get(
  "/health",
  (req: Request, res: Response): void => {
    res.status(200).json({
      success: true,
      message: "Server is healthy.",
      timestamp: new Date().toISOString(),
    });
  },
);