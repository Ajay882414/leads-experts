import api from "@/lib/axios";
import {
  SignupData,
  LoginData,
} from "@/types/auth";

// Signup
export const signupUser = async (
  data: SignupData
) => {
  const response = await api.post(
    "/auth/signup",
    data
  );

  return response.data;
};

// Login
export const loginUser = async (
  data: LoginData
) => {
  const response = await api.post(
    "/auth/login",
    data
  );

  return response.data;
};

// Logout
export const logoutUser = async () => {
  const response = await api.post(
    "/auth/logout"
  );

  return response.data;
};

// Current User
export const getCurrentUser =
  async () => {
    const response = await api.get(
      "/auth/me"
    );

    return response.data;
  };

// Profile
export const getProfile = async () => {
  const response = await api.get(
    "/profile"
  );

  return response.data;
};

// Update Profile
export const updateProfile =
  async (data: any) => {
    const response = await api.put(
      "/profile",
      data
    );

    return response.data;
  };


  export const forgotPassword = async (
  email: string
) => {
  const response = await api.post(
    "/auth/forgot-password",
    {
      email,
    }
  );

  return response.data;
};

// Reset Password
export const resetPassword = async (
  data: {
    email: string;
    otp: string;
    password: string;
    confirmPassword: string;
  }
) => {
  const response = await api.post(
    "/auth/reset-password",
    data
  );

  return response.data;
};


export const resendOtp = async (
  email: string
) => {
  const response = await api.post(
    "/auth/resend-otp",
    {
      email,
    }
  );

  return response.data;
};