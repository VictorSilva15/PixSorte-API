import express from "express";
import { cardRoutes } from "./routes/card.routes";
import { userRoutes } from "./routes/user.routes";
import cors from "cors";

const app = express();

app.use((_, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Origin", " * ");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-Width, Content-Type, Accept, user-uuid"
  );

  app.use(cors());
  next();
});

app.use(express.json());

app.use("/api/users", userRoutes)
app.use("/api/cards", cardRoutes);

export { app };
