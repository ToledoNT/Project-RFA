import express, { Router } from "express";
import { CreateUserController } from "../controller/user/create-user-controller";
import { UpdateClienteController } from "../controller/user/update-user-controller";
import { DeleteUserController } from "../controller/user/delete-user-controller";
import { GetAllUsersController } from "../controller/user/get-users-controller";
import { ClienteMiddleware, LoginMiddleware } from "../middleware/cliente-middleware";
import { LoginUserController } from "../controller/user/login-user-controller";
import { CreateRaffleController } from "../controller/raffle/create-raffle-controller";

const router: Router = express.Router();

const updateClienteController = new UpdateClienteController();
const deleteUserController = new DeleteUserController(); 
const getAllUsersController = new GetAllUsersController();

router.post(
    "/user/register",
    new ClienteMiddleware().handle.bind(new ClienteMiddleware()),
    new CreateUserController().handle.bind(new CreateUserController())
  );

router.post(
    "/user/login",
    new LoginMiddleware().handle.bind(new LoginMiddleware()),
    new LoginUserController().handle.bind(new LoginUserController())
  );


router.put("/user/update", updateClienteController.handle.bind(updateClienteController));
router.delete("/user/delete", deleteUserController.handle.bind(deleteUserController));
router.get("/user/allusers", getAllUsersController.handle.bind(getAllUsersController));

export default router;