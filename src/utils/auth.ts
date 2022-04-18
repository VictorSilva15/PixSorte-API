import jwt from "jsonwebtoken";

import { auth } from "./config";
import { UserController } from "../application/useCases/User/userController";

export function generateJwtAndRefreshToken(
  email: string,
  payload: object = {}
) {
  const token = jwt.sign(payload, auth.secret, {
    subject: email,
    expiresIn: "1h", // 1 hora
  });

  const refreshToken = new UserController().createRefreshToken(email);
  return {
    token,
    refreshToken,
  };
}
