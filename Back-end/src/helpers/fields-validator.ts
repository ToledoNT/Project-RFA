import { ResponseTemplateInterface } from "../interfaces/response-template-interface"; 
import { ResponseTemplateModel } from "../model/response-template-model"; 
export class FieldsValidator {
  execute(value: any, fieldsList: Array<string>): ResponseTemplateInterface {
    for (const field of fieldsList) {
      if (!value[field] && value[field] === "") {
        return new ResponseTemplateModel(
          false,
          406,
          `Erro ao utilizar recurso, valor ${field} vazio, verifique.`,
          fieldsList
        );
      }
    }
    return new ResponseTemplateModel(
      true,
      200,
      "Campos validados com sucesso.",
      fieldsList
    );
  }
}