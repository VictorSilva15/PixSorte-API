import express from "express";
import { adminRoutes } from "./routes/admin.routes";
import { cardRoutes } from "./routes/card.routes";

import cors from "cors";

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Origin", " * ");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-Width, Content-Type, Accept"
  );

  app.use(cors());
  next();
});

app.use(express.json());

app.use("/admin", adminRoutes);
app.use("/card", cardRoutes);

export { app };
