import { ResponseTemplate } from "../../helpers/response-template";
import { IFetchCliente } from "../../interfaces/user/fetch-user-interface";
import { FetchClienteModel } from "../user/fetch-cliente-model";

export class ResponseClienteModel extends ResponseTemplate {
  data: Array<IFetchCliente>;
  constructor(value: any) {
    super(value);
    this.data = this.formatValues(value?.data);
  }
  formatValues(value: any): Array<IFetchCliente> {
    const valuesList = Array<IFetchCliente>();
    if (Array.isArray(value) && value.length > 0) {
      for (const data of value) {
        const valueFormated = new FetchClienteModel(data);
        valuesList.push(valueFormated);
      }
    } else {
      const valueFormated = new FetchClienteModel(value);
      valuesList.push(valueFormated);
    }
    return valuesList;
  }
}