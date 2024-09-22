import { toast } from "react-toastify";

export class ToastError {
  static serialize(error: any) {
    if (error) {
      try {
        error.data.errors.forEach((el: { field: string; message: string }) => {
          toast.error(el.message);
        });
      } catch (err) {
        toast.error("Unknown error occured.");
      }
    }
  }
}
