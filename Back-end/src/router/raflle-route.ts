import express, { Router } from "express";
import { LoginUserController } from "../controller/user/login-user-controller";
import { CreateRaffleController } from "../controller/raffle/create-raffle-controller";
import { GetAllRafflesController } from "../controller/raffle/get-raffles-controller";

const router: Router = express.Router();

const createRaffleController = new CreateRaffleController();
const getAllRafflesController = new GetAllRafflesController();


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

export default router;