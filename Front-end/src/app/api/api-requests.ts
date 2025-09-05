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
      console.log(response + "aqui");
      return response.data;
    } catch (error) {
      this.handleError(error, "Erro ao registrar usuário");
    }
  }

  async loginUser(data: ILoginFormData): Promise<LoginResponse> {
    try {
      const response = await this.api.post("/user/login", data);
      return response.data as LoginResponse;
    } catch (error) {
      this.handleError(error, "Erro ao autenticar usuário");
    }
  }

  private getAuthHeaders() {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async rifaNumbers(): Promise<Rifa[]> {
    try {
      const response = await this.api.get("/rfa/numbers", {
        headers: this.getAuthHeaders(),
      });
      return response.data.data as Rifa[];
    } catch (error) {
      this.handleError(error, "Erro ao buscar rifas");
    }
  }

  async buyNumber(id: string, email: string): Promise<unknown> {
    try {
      const response = await this.api.put(
        "/rfa/buynumber",
        { id, email },
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      this.handleError(error, "Erro ao comprar número");
    }
  }

  async userPurchase(email: string): Promise<UserRaffleResponse> {
    try {
      const response = await this.api.post(
        "/rfa/userpurchase",
        { email },
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      this.handleError(error, "Erro ao buscar rifas compradas");
    }
  }
  async resetPass(email: string, currentpassword: string, newpassword: string): Promise<UserRaffleResponse> {
    try {
      const token = localStorage.getItem("token");
  
      if (!token) {
        throw new Error("Usuário não autenticado. Faça login novamente.");
      }
  
      const response = await this.api.put(
        "/user/resetpass",
        { email, currentpassword, newpassword },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      return response.data;
    } catch (error: unknown) {
      this.handleError(error, "Erro ao resetar senha");
      throw error;
    }
  }
    
    private handleError(error: unknown, defaultMessage: string): never {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message || defaultMessage);
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(defaultMessage);
  }
}