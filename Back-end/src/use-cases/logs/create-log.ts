import { DatabaseLog } from "../../db/prisma/repositories/prisma-logs-repository";
import { ResponseTemplateInterface } from "../../interfaces/response-template-interface";

export class CreateLog {
  async execute(value: ResponseTemplateInterface): Promise<void> {
    await new DatabaseLog().create(value);
    return;
  }
}