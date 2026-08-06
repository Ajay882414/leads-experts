export interface SignupData {
  fullName: string;
  email: string;
  mobileNumber: string;
  platform: string;
  state: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  _id?: string;
  id?: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  platform: string;
  state: string;
  role?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user: User;
}