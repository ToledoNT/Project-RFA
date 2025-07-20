import axios, { AxiosInstance } from "axios";
import { IRegisterFormData } from "../interfaces/register-interface";

const apiBaseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4001/api";

export class ApiService {
  private api: AxiosInstance;

  constructor(baseURL?: string) {
    this.api = axios.create({
      baseURL: baseURL || apiBaseURL,
      headers: { "Content-Type": "application/json" },
    });
  }

  async registerUser(data: IRegisterFormData): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await this.api.post("/user/register", data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data || error.message || "Erro ao registrar usuário";
      }
      if (error instanceof Error) {
        throw error.message;
      }
      throw "Erro desconhecido";
    }
  }
}