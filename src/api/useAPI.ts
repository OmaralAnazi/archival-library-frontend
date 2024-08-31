import axios from "axios";
import useAuthStore from "../stores/AuthStore";
import useCustomToast, { ToastStatus } from "../hooks/useCustomToast";
import useFormat from "../hooks/useFormat";

const useAPI = () => {
  const { showMessage } = useCustomToast();
  const { accessToken } = useAuthStore();
  const { formatDate } = useFormat();
  const BASE_URL = "https://localhost:7076";

  const api = axios.create({
    baseURL: BASE_URL + "/api",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  });

  // axios middleware:
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const { status } = error.response || {};

      switch (status) {
        case 400:
        case 401:
          break;
        case 403:
          showMessage(
            "Forbidden. You don't have permission to access this resource.",
            ToastStatus.ERROR
          );
          break;
        case 404:
          showMessage("Resource not found.", ToastStatus.ERROR);
          break;
        case 500:
          showMessage("An unexpected error occurred. Please try again later.", ToastStatus.ERROR);
          break;
        case 503:
          showMessage("Service unavailable. Please try again later.", ToastStatus.ERROR);
          break;
        default:
          showMessage("An unexpected error occurred.", ToastStatus.ERROR);
          break;
      }

      return Promise.reject(error);
    }
  );

  const submitLoginForm = async (request: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await api.post("/auth/login", request);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  };

  const submitSignupForm = async (request: SignupRequest): Promise<SignupResponse> => {
    try {
      const formattedRequest = {
        ...request,
        birthdate: formatDate(request.birthdate),
      };
      const response = await api.post("/auth/register", formattedRequest);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  };

  return {
    submitLoginForm,
    submitSignupForm,
  };
};

export default useAPI;

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthdate: Date;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignupResponse {
  token: string;
}

export interface UserClaims {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface LibraryDocument {
  id: number;
  title: string;
  author: string;
  publicationDate: string;
  description: string;
  category: string;
  imageUrl: string;
  documentUrl: string;
}
