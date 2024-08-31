import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import useAPI, { LoginRequest } from "../api/useAPI";
import useAuthStore from "../stores/AuthStore";
import useJwtDecode from "./useJwtDecode";
import useCustomToast, { ToastStatus } from "./useCustomToast";

const validationSchema = Yup.object({
  email: Yup.string().required("Email is required").email("Invalid email address"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const useLogin = () => {
  const { handleSubmit, register, formState } = useForm<LoginRequest>({
    resolver: yupResolver(validationSchema),
  });
  const { submitLoginForm } = useAPI();
  const navigate = useNavigate();
  const { decodeToken } = useJwtDecode();
  const { showMessage } = useCustomToast();
  const { setAccessToken, setUserId, setEmail, setFirstName, setLastName, setPhoneNumber } =
    useAuthStore();

  const onSubmit = async (data: LoginRequest) => {
    try {
      const response = await submitLoginForm(data);
      const claims = decodeToken(response.token);

      if (!claims) {
        showMessage("An unexpected error occurred. Please try again later.", ToastStatus.ERROR);
        return;
      }

      setAccessToken(response.token);
      setUserId(claims.userId);
      setEmail(claims.email);
      setFirstName(claims.firstName);
      setLastName(claims.lastName);
      setPhoneNumber(claims.phoneNumber);

      navigate("/");
    } catch (error) {
      showMessage("Invalid email or password.", ToastStatus.ERROR);
    }
  };

  return {
    handleSubmit,
    register,
    onSubmit,
    formState,
  };
};

export default useLogin;
