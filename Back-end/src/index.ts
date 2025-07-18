import { server } from "./server";
import dotenv from "dotenv";
server.listen(4001, () => {
  dotenv.config();
  console.clear();
  console.log(`--Server ON--`);
});