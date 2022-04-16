import { Router } from "express";
import { UserController } from "../application/useCases/User/userController";
import { LoginUserUseCase } from "../application/useCases/User/loginUserUseCase";
import { RegisterUserUseCase } from "../application/useCases/User/registerUserUseCase";
import { RefreshTokenUseCase } from "../application/useCases/User/refreshTokenUseCase";
import { SessionUseCase } from "../application/useCases/User/sessionUseCase";
import {
  userRegisterValidation,
  userLoginValidation,
} from "../utils/validation";
import { SignoutUseCase } from "../application/useCases/User/singoutUseCase";

const userController = new UserController();

const userRoutes = Router();

// Login Route
userRoutes.post("/login", async (req, res) => {
  const loginUserUseCase = new LoginUserUseCase(userController);

  try {
    await userLoginValidation(req.body);

    const result = await loginUserUseCase.execute(req.body);

    if (result.error) return res.status(400).send(result.error?.message);

    return res.status(200).send(result.data);
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

userRoutes.get("/me", async (req, res) => {
  const sessionUserUseCase = new SessionUseCase(userController);

  let access_token = req.header("access_token") as string;

  try {
    const { data, error } = await sessionUserUseCase.execute(access_token);

    if (error) return res.status(400).send(error?.message);

    return res.status(200).send(data);
  } catch (error: any) {
    return res.status(400).send(error?.message);
  }
});

// Singout User Route

userRoutes.get("/me/singout", async (req, res) => {
  const singoutUseCase = new SignoutUseCase(userController);

  let access_token = req.header("access_token") as string;

  const { error } = await singoutUseCase.execute(access_token);

  if (error) return res.status(400).send(error?.message);

  return res.status(200).send("Logged Out successfully");
});

// Refresh Token Route

userRoutes.get("/me/refresh", async (req, res) => {
  const refreshToken = new RefreshTokenUseCase(userController);

  let access_token = req.header("access_token") as string;

  const { user, error } = await refreshToken.execute(access_token);

  if (error) return res.status(400).send(error?.message);

  return res.status(200).send(user);
});

export { userRoutes };
