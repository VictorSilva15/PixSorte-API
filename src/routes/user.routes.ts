import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "../application/useCases/User/userController";
import { LoginUserUseCase } from "../application/useCases/User/loginUserUseCase";
import { RegisterUserUseCase } from "../application/useCases/User/registerUserUseCase";
import { RefreshTokenUseCase } from "../application/useCases/User/refreshTokenUseCase";
import { SessionUseCase } from "../application/useCases/User/sessionUseCase";
import {
  userRegisterValidation,
  userLoginValidation,
} from "../utils/validation";
import { generateJwtAndRefreshToken } from "../utils/auth";
import jwt from "jsonwebtoken";
import { auth } from "../utils/config";
import { DecodedToken } from "../types/tokens";
import decode from "jwt-decode";
import { UserProps } from "../domain/entities/user";

const userController = new UserController();

const userRoutes = Router();

// MiddleWares

function checkAuthMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({
      error: true,
      code: "token.invalid",
      message: "Token not present.",
    });
  }

  const [, token] = authorization?.split(" ");

  if (!token) {
    return response.status(401).json({
      error: true,
      code: "token.invalid",
      message: "Token not present.",
    });
  }

  try {
    const decoded = jwt.verify(token as string, auth.secret) as DecodedToken;

    request.user = decoded.sub;

    return next();
  } catch (err) {
    return response
      .status(401)
      .json({ error: true, code: "token.expired", message: "Token invalid." });
  }
}

function addUserInformationToRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      error: true,
      code: "token.invalid",
      message: "Token not present.",
    });
  }

  const [, token] = authorization?.split(" ");

  if (!token) {
    return res.status(401).json({
      error: true,
      code: "token.invalid",
      message: "Token not present.",
    });
  }

  try {
    const decoded = decode(token as string) as DecodedToken;

    req.user = decoded.sub;

    return next();
  } catch (err) {
    return res.status(401).json({
      error: true,
      code: "token.invalid",
      message: "Invalid token format.",
    });
  }
}

// Login Route
userRoutes.post("/login", async (req, res) => {
  const loginUserUseCase = new LoginUserUseCase(userController);

  try {
    await userLoginValidation(req.body);

    const user = await loginUserUseCase.execute(req.body);

    if (
      user.data[0].length === 0 ||
      req.body.password !== user.data[0].password
    ) {
      return res.status(401).json({
        error: true,
        message: "E-mail or password incorrect.",
      });
    }

    const { token, refreshToken } = generateJwtAndRefreshToken(
      user.data[0].email,
      {
        permissions: user.data[0].permissions,
        roles: user.data[0].roles,
      }
    );

    console.log(token, refreshToken);

    return res.json({
      token,
      refreshToken,
      permissions: user.data[0].permissions,
      roles: user.data[0].roles,
    });
  } catch (error: any) {
    return res.status(400).send(error?.message);
  }
});

// Register Route

userRoutes.post("/register", async (req, res) => {
  const registerUserUseCase = new RegisterUserUseCase(userController);

  try {
    await userRegisterValidation(req.body);

    const { data, error } = await registerUserUseCase.execute(req.body);

    if (error) return res.status(400).send(error?.message);

    return res.status(200).send(data);
  } catch (error: any) {
    return res.status(400).send(error?.message);
  }
});

// Get User Route

userRoutes.get("/me", checkAuthMiddleware, async (req, res) => {
  const sessionUserUseCase = new SessionUseCase(userController);

  const email = req.user;

  const user = await sessionUserUseCase.execute(email);

  if (!user) {
    return res.status(400).json({ error: true, message: "User not found." });
  }

  return res.json({
    email,
    permissions: user.data[0].permissions,
    roles: user.data[0].roles,
  });
});

// Refresh Token Route

userRoutes.post("/refresh", addUserInformationToRequest, async (req, res) => {
  const sessionUserUseCase = new RefreshTokenUseCase(userController);
  const email = req.user;
  const { refreshToken } = req.body;

  const user = await sessionUserUseCase.execute(email);

  if (!user) {
    return res.status(401).json({
      error: true,
      message: "User not found.",
    });
  }

  if (!refreshToken) {
    return res
      .status(401)
      .json({ error: true, message: "Refresh token is required." });
  }

  const isValidRefreshToken = await userController.checkRefreshTokenIsValid(
    email,
    refreshToken
  );

  if (!isValidRefreshToken) {
    return res
      .status(401)
      .json({ error: true, message: "Refresh token is invalid." });
  }

  await userController.invalidateRefreshToken(email, refreshToken);

  const { token, refreshToken: newRefreshToken } = generateJwtAndRefreshToken(
    email,
    {
      permissions: user.permissions,
      roles: user.roles,
    }
  );

  return res.json({
    token,
    refreshToken: newRefreshToken,
    permissions: user.permissions,
    roles: user.roles,
  });
});

export { userRoutes };
