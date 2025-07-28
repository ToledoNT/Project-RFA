import express, { Router } from "express";
import { LoginUserController } from "../controller/user/login-user-controller";
import { CreateRaffleController } from "../controller/raffle/create-raffle-controller";
import { GetAllRafflesController } from "../controller/raffle/get-raffles-controller";
import { BuyRaffleController } from "../controller/raffle/buy-raffle-controller";
import { FindRaflleUserByEmailController } from "../controller/raffle/find-client-raflle-by-email";
import { BuyRaffleMiddleware, CreateRaffleMiddleware, FindRaffleUserByEmailMiddleware, GetAllRafflesAvailableMiddleware } from "../middleware/raflle-middleware";
import {  AuthenticateTokenMiddleware } from "../middleware/cliente-middleware";

const router: Router = express.Router();

const createRaffleController = new CreateRaffleController();
const getAllRafflesController = new GetAllRafflesController();
const buyRaffleController = new BuyRaffleController
const findRaflleUserByEmailController = new FindRaflleUserByEmailController();

router.post(
  "/rfa/createraffle",
  new AuthenticateTokenMiddleware().handle.bind(new AuthenticateTokenMiddleware()),
  new CreateRaffleMiddleware().handle.bind(new CreateRaffleMiddleware()),
  createRaffleController.handle.bind(createRaffleController)
);

router.get(
  "/rfa/numbers",
  new AuthenticateTokenMiddleware().handle.bind(new AuthenticateTokenMiddleware()),
  new GetAllRafflesAvailableMiddleware().handle.bind(new GetAllRafflesAvailableMiddleware()),
  getAllRafflesController.handle.bind(getAllRafflesController)
);

router.put(
  "/rfa/buynumber",
  new AuthenticateTokenMiddleware().handle.bind(new AuthenticateTokenMiddleware()),
  new BuyRaffleMiddleware().handle.bind(new BuyRaffleMiddleware()),
  buyRaffleController.handle.bind(buyRaffleController)
);

router.post(
  "/rfa/userpurchase", 
  new AuthenticateTokenMiddleware().handle.bind(new AuthenticateTokenMiddleware()),
  new FindRaffleUserByEmailMiddleware().handle.bind(new FindRaffleUserByEmailMiddleware()),
  findRaflleUserByEmailController.handle.bind(findRaflleUserByEmailController));

export default router;