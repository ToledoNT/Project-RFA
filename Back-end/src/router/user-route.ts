import express, { Router } from "express";
import { CreateUserController } from "../controller/user/create-user-controller";
import { UpdateClienteController } from "../controller/user/update-user-controller";
import { DeleteUserController } from "../controller/user/delete-user-controller";
import { GetAllUsersController } from "../controller/user/get-users-controller";
import { AuthenticateTokenMiddleware, ClienteMiddleware, DeleteUserMiddleware, EmailHeaderMiddleware, GetUsersMiddleware, LoginMiddleware, ResetPasswordMiddleware } from "../middleware/cliente-middleware";
import { LoginUserController } from "../controller/user/login-user-controller";
import { ResetPassUserController } from "../controller/user/reset-pass-controller";

const router: Router = express.Router();

const createUserController = new CreateUserController();
const updateClienteController = new UpdateClienteController();
const deleteUserController = new DeleteUserController(); 
const getAllUsersController = new GetAllUsersController();
const loginUserController = new LoginUserController();
const resetPassUser = new ResetPassUserController();

const clienteMiddleware = new ClienteMiddleware();
const loginMiddleware = new LoginMiddleware();
const getUsersMiddleware = new GetUsersMiddleware();
const resetPassMiddleware = new ResetPasswordMiddleware();
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
  new AuthenticateTokenMiddleware().handle.bind(new AuthenticateTokenMiddleware()),
  getUsersMiddleware.handle.bind(getUsersMiddleware),
  getAllUsersController.handle.bind(getAllUsersController)
);

router.put(
  "/user/update", 
  new AuthenticateTokenMiddleware().handle.bind(new AuthenticateTokenMiddleware()),
  emailUpdateUser.handle.bind(emailUpdateUser),
  updateClienteController.handle.bind(updateClienteController)
);

router.delete(
  "/user/delete",
  new AuthenticateTokenMiddleware().handle.bind(new AuthenticateTokenMiddleware()),
  deleteUser.handle.bind(deleteUser),
  deleteUserController.handle.bind(deleteUserController)
);

router.put(
  "/user/resetpass",
  new AuthenticateTokenMiddleware().handle.bind(new AuthenticateTokenMiddleware()),
  resetPassMiddleware.handle.bind(resetPassMiddleware),
  resetPassUser.handle.bind(resetPassUser)
);

export default router;