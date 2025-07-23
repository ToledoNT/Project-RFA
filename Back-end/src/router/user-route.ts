import express, { Router } from "express";
import { CreateUserController } from "../controller/user/create-user-controller";
import { UpdateClienteController } from "../controller/user/update-user-controller";
import { DeleteUserController } from "../controller/user/delete-user-controller";
import { GetAllUsersController } from "../controller/user/get-users-controller";
import { ClienteMiddleware, DeleteUserMiddleware, EmailHeaderMiddleware, GetUsersMiddleware, LoginMiddleware } from "../middleware/cliente-middleware";
import { LoginUserController } from "../controller/user/login-user-controller";

const router: Router = express.Router();

const createUserController = new CreateUserController();
const updateClienteController = new UpdateClienteController();
const deleteUserController = new DeleteUserController(); 
const getAllUsersController = new GetAllUsersController();
const loginUserController = new LoginUserController();

const clienteMiddleware = new ClienteMiddleware();
const loginMiddleware = new LoginMiddleware();
const getUsersMiddleware = new GetUsersMiddleware();
const emailUpdateUser = new EmailHeaderMiddleware();
const deleteUser = new DeleteUserMiddleware();

router.post(
  "/user/register",
  clienteMiddleware.handle.bind(clienteMiddleware),
  createUserController.handle.bind(createUserController)
);

router.post(
  "/user/login",
  loginMiddleware.handle.bind(loginMiddleware),
  loginUserController.handle.bind(loginUserController)
);

router.get(
  "/user/allusers", 
  getUsersMiddleware.handle.bind(getUsersMiddleware),
  getAllUsersController.handle.bind(getAllUsersController)
);

router.put(
  "/user/update", 
  emailUpdateUser.handle.bind(emailUpdateUser),
  updateClienteController.handle.bind(updateClienteController)
);

router.delete(
  "/user/delete",
  deleteUser.handle.bind(deleteUser),
  deleteUserController.handle.bind(deleteUserController)
);

export default router;