import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import useAPI, { SignupRequest } from "../api/useAPI";
import useCustomToast, { ToastStatus } from "../hooks/useCustomToast";
import useJwtDecode from "./useJwtDecode";
import useAuthStore from "../stores/AuthStore";

const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(3, "First name must be at least 3 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(3, "Last name must be at least 3 characters")
    .required("Last name is required"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number is not valid")
    .min(10, "Phone number must be at least 10 digits"),
  birthdate: Yup.date()
    .required("Birthdate is required")
    .max(new Date(), "Birthdate cannot be in the future"),
  email: Yup.string().required("Email is required").email("Invalid email address"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const useSignup = () => {
  const { handleSubmit, register, formState } = useForm<SignupRequest>({
    resolver: yupResolver(validationSchema),
  });
  const { showMessage } = useCustomToast();
  const navigate = useNavigate();
  const { submitSignupForm } = useAPI();
  const { decodeToken } = useJwtDecode();
  const { setAccessToken, setUserId, setEmail, setFirstName, setLastName, setPhoneNumber } =
    useAuthStore();

  const onSubmit = async (data: SignupRequest) => {
    try {
      const response = await submitSignupForm(data);
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
      showMessage("Signup failed. Please try again.", ToastStatus.ERROR);
    }
  };

  return {
    handleSubmit,
    register,
    onSubmit,
    formState,
  };
};

export default useSignup;
