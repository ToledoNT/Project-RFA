export interface LoginResponse {
  success: boolean;
  message?: string;
  user?: {
    isEmailConfirmed: boolean;
    email: string;
    token: string;
  };
}
export interface ILoginFormData {
  email: string;
  password: string;
}