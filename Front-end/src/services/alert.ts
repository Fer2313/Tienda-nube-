import Swal from "sweetalert2";

export const customAlert = (
  title: string,
  text: string | undefined,
  icon: "warning" | "error" | "success",
  confirmButtonText: string | undefined
) => {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: confirmButtonText,
  });
};
