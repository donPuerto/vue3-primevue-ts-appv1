// Vue Toast
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default function useToast() {
  type Position =
    | "TOP_LEFT"
    | "TOP_RIGHT"
    | "TOP_CENTER"
    | "BOTTOM_LEFT"
    | "BOTTOM_RIGHT"
    | "BOTTOM_CENTER";

  function handleErrorToast(error: any, autoClose: number, position: Position) {
    if (error instanceof Error) {
      // handle error as oject
      toast.error(error.message, {
        autoClose: autoClose,
        position: toast.POSITION[`${position}`],
      });
    } else if (typeof error === "string") {
      // handle as string
      toast.error(error, {
        autoClose: autoClose,
        position: toast.POSITION[`${position}`],
      });
    } else {
      // handle any error
      toast.error(error, {
        autoClose: autoClose,
        position: toast.POSITION[`${position}`],
      });
    }
  }

  function handleSuccessToast(
    message: string,
    autoClose: number,
    position: Position
  ) {
    toast.success(message, {
      autoClose: autoClose,
      position: toast.POSITION[`${position}`],
    });
  }

  return {
    handleErrorToast,
    handleSuccessToast,
  };
}
