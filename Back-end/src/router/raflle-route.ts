import express, { Router } from "express";
import { LoginUserController } from "../controller/user/login-user-controller";
import { CreateRaffleController } from "../controller/raffle/create-raffle-controller";
import { GetAllRafflesController } from "../controller/raffle/get-raffles-controller";
import { BuyRaffleController } from "../controller/raffle/buy-raffle-controller";
import { FindRaflleUserByEmailController } from "../controller/raffle/find-client-raflle-by-email";

const router: Router = express.Router();

const createRaffleController = new CreateRaffleController();
const getAllRafflesController = new GetAllRafflesController();
const buyRaffleController = new BuyRaffleController
const findRaflleUserByEmailController = new FindRaflleUserByEmailController();


router.post(
  "/rfa/createraffle",
  // new LoginMiddleware().handle.bind(new LoginMiddleware()),
  createRaffleController.handle.bind(createRaffleController)
);

router.get(
  "/rfa/numbers",
  // new LoginMiddleware().handle.bind(new LoginMiddleware()),
  getAllRafflesController.handle.bind(getAllRafflesController)
);

router.put(
  "/rfa/buynumber",
  // new LoginMiddleware().handle.bind(new LoginMiddleware()),
  buyRaffleController.handle.bind(buyRaffleController)
);
router.post(
  "/rfa/userpurchase", 
  findRaflleUserByEmailController.handle.bind(findRaflleUserByEmailController));

export default router;