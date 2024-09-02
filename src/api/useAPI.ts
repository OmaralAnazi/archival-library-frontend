import axios from "axios";
import useAuthStore from "../stores/AuthStore";
import useCustomToast, { ToastStatus } from "../hooks/useCustomToast";
import useFormat from "../hooks/useFormat";

const useAPI = () => {
  const { showMessage } = useCustomToast();
  const { accessToken } = useAuthStore();
  const { formatDate } = useFormat();
  const { logout } = useAuthStore();
  const BASE_URL = import.meta.env.VITE_BASE_API_URL;

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
      // Check if the error is related to a network issue
      if (!error.response) {
        if (error.message.includes("Network Error")) {
          showMessage(
            "Network Error: Unable to reach the server. Please check your internet connection.",
            ToastStatus.ERROR
          );
        } else if (error.code === "ECONNABORTED") {
          showMessage("Request timed out. Please try again.", ToastStatus.ERROR);
        } else {
          showMessage("An unexpected network error occurred.", ToastStatus.ERROR);
        }
        return Promise.reject(error);
      }

      const { status } = error.response || {};

      switch (status) {
        case 400:
          break;
        case 401:
          if (accessToken) {
            logout();
            showMessage("Your login session has expired", ToastStatus.WARNING);
          }
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
      formData.append("categoryId", request.categoryId);

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

  const deleteDocument = async (id: number): Promise<unknown> => {
    try {
      const response = await api.delete(`/documents/${id}`);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  };

  const getCategories = async (): Promise<CategoryResponse[]> => {
    try {
      const response = await api.get(`/categories`);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  };

  const viewDocumentFile = async (id: number): Promise<void> => {
    try {
      window.open(`${BASE_URL}/api/documents/view/${id}`, "_blank");
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
    deleteDocument,
    getCategories,
    viewDocumentFile,
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
  categoryId: string;
}

export interface DocumentResponse {
  id: number;
  title: string;
  description: string;
  categoryName: string;
  authorName: string;
  publicationDate: string;
}

export interface CategoryResponse {
  id: number;
  name: string;
}
