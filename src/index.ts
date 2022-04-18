import { AppErrors } from "./errors/AppErrors";
import "express-async-errors";
import express, {
  NextFunction,
  ErrorRequestHandler,
  Request,
  Response,
} from "express";

import { usersRoutes } from "./routes/users.routes";

const app = express();

app.use(express.json());

app.use("/users", usersRoutes);

app.use(
  (
    err: ErrorRequestHandler,
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    if (err instanceof AppErrors) {
      return response.status(err.statusCode).json({
        error: err.message,
      });
    }
    return response.status(500).json({
      status: "error",
      error: "Internal server error",
    });
  }
);

export { app };
