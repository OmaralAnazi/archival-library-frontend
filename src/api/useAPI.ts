import axios from "axios";
import useAuthStore from "../stores/AuthStore";
import useCustomToast, { ToastStatus } from "../hooks/useCustomToast";
import useFormat from "../hooks/useFormat";

const useAPI = () => {
  const { showMessage } = useCustomToast();
  const { accessToken } = useAuthStore();
  const { formatDate } = useFormat();
  const BASE_URL = "https://localhost:7076"; // TODO: extract to .env

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
          break;
        case 401: // TODO: if 401, and has access token, then its expierd, log him out!!!
          break;
        case 403:
          showMessage(
            "Forbidden. You don't have permission to access this resource.",
            ToastStatus.ERROR
          );
          break;
        case 404:
          showMessage("EROR_404: Resource not found.", ToastStatus.ERROR);
          break;
        case 500:
          showMessage(
            "ERROR_500: An unexpected error occurred. Please try again later.",
            ToastStatus.ERROR
          );
          break;
        case 503:
          showMessage("ERROR_503: Service unavailable. Please try again later.", ToastStatus.ERROR);
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

  const uploadDocument = async (request: UploadDocumentRequest): Promise<unknown> => {
    try {
      const formData = new FormData();
      formData.append("file", request.file);
      formData.append("title", request.title);
      formData.append("description", request.description);
      formData.append("categoryId", "1"); // TODO: replace with real id

      const options = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await api.post("/documents/upload", formData, options);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  };

  const getAllDocuments = async (): Promise<DocumentResponse[]> => {
    try {
      const response = await api.get("/documents");
      return response.data;
    } catch (error: any) {
      throw error;
    }
  };

  const getAllDocumentsByUser = async (): Promise<DocumentResponse[]> => {
    try {
      const response = await api.get("/documents/my");
      return response.data;
    } catch (error: any) {
      throw error;
    }
  };

  return {
    submitLoginForm,
    submitSignupForm,
    uploadDocument,
    getAllDocuments,
    getAllDocumentsByUser,
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

export interface UploadDocumentRequest {
  file: File;
  title: string;
  description: string;
  category: string;
}

export interface DocumentResponse {
  id: number;
  title: string;
  description: string;
  categoryName: string;
  authorName: string;
  publicationDate: string;
}
