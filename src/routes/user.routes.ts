import { Router } from "express";
import { UserController } from "../application/useCases/User/userController";
import { LoginUserUseCase } from "../application/useCases/User/loginUserUseCase";
import { RegisterUserUseCase } from "../application/useCases/User/registerUserUseCase";
import { userRegisterValidation, userLoginValidation } from "../utils/validation";

const userController = new UserController();

const userRoutes = Router();

// Login Route
userRoutes.post("/login", async (req,res) => {

    const  loginUserUseCase = new LoginUserUseCase(userController);

    try{

        await userLoginValidation(req.body);

        const result = await loginUserUseCase.execute(req.body);

        console.log(result);

        if(result.error) return res.status(400).send(result.error?.message);

        return res.status(200).send(result.data);

    }catch(error: any) {
        return res.status(400).send(error?.message)
    }

});

// Register Route

userRoutes.post("/register", async (req,res) => {

    const  registerUserUseCase = new RegisterUserUseCase(userController);

    try{

        await userRegisterValidation(req.body);

        const {data, error} = await registerUserUseCase.execute(req.body);

        if(error) return res.status(400).send(error?.message);

        return res.status(200).send(data);

    }catch(error: any) {
        return res.status(400).send(error?.message)
    }

});



export {userRoutes}