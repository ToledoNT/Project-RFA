import axios, { AxiosInstance } from "axios";
import { IRegisterFormData } from "../interfaces/register-interface";
import { ILoginFormData, LoginResponse } from "../interfaces/login-interface";
import { Rifa, UserRaffleResponse } from "../interfaces/home-interface";

const apiBaseURL = "http://localhost:4001/api";

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
        throw new Error(error.response?.data?.message || error.message || "Erro ao registrar usuário");
      }
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Erro desconhecido");
    }
  }

  async loginUser(data: ILoginFormData): Promise<LoginResponse> {
    try {
      const response = await this.api.post("/user/login", data);
      return response.data as LoginResponse;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || error.message || "Erro ao autenticar usuário");
      }
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Erro desconhecido");
    }
  }

  async rifaNumbers(): Promise<Rifa[]> {
    try {
      const response = await this.api.get("/rfa/numbers");
      console.log(response);
      return response.data.data as Rifa[];
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || error.message || "Erro ao buscar rifas");
      }
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Erro desconhecido");
    }
  }

  async buyNumber(id: string, email: string): Promise<unknown> {
    try {
      const response = await this.api.put('/rfa/buynumber', { id, email });
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Erro desconhecido");
    }
  }

  async userPurchase(email: string): Promise<UserRaffleResponse> {
    try {
      const response = await this.api.post<UserRaffleResponse>('/rfa/userpurchase', { email });
      console.log(response);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || error.message || "Erro ao buscar rifas compradas");
      }
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Erro desconhecido");
    }
  }
}