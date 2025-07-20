import dotenv from "dotenv";
dotenv.config(); // Carrega as variáveis primeiro
import { server } from "./server";
server.listen(4001, () => {
  console.clear();
  console.log(`--Server ON--`);
});
