import { Router } from "express";
import { AdminController } from "../application/useCases/Admin/adminController";
import { VerifyAdminUseCase } from "../application/useCases/Admin/loginAdminUseCase";
import { LogoutAdminUseCase } from "../application/useCases/Admin/logoutAdminUseCase";

// routes
const adminRoutes = Router();

// admin controller
const adminController = new AdminController();

// POST
adminRoutes.post("/", async (req, res) => {
  const createStudent = new CreateStudentUseCase(createStudentController);

  try {
    const result = await createStudent.execute(req.body);
    return res.json({result: result});
  } catch (error: any) {
    return res.json({error: error});
  }
});


// Logout from the system
adminRoutes.get("/logout", async (req, res) => {
  const logout = new LogoutAdminUseCase(adminController);


  try {
    const result = await logout.execute();
    return res.json({result: result});
  } catch (error: any) {
    return res.json({error: error});
  }
});


export { adminRoutes };
