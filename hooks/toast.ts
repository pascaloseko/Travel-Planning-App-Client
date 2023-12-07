import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToastType = "success" | "info" | "warning" | "error";

const useToast = () => {
  const showToast = (
    message: string,
    type: ToastType,
    options?: ToastOptions
  ) => {
    toast(message, { type, ...options });
  };

  return { showToast };
};

export default useToast;
