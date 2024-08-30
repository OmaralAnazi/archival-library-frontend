import { useToast } from "@chakra-ui/react";

export enum ToastStatus {
  ERROR = "error",
  SUCCESS = "success",
}

const useCustomToast = () => {
  const toast = useToast();

  const showMessage = (message: string, status: ToastStatus) => {
    toast({
      title: message,
      status: status,
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  };

  return {
    showMessage,
  };
};

export default useCustomToast;
