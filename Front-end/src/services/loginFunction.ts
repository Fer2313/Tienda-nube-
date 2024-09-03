import axios from "axios";
import { customAlert } from "./alert";

export default async function loginFunction(data: any) {
  try {
    const response = await axios.post(
      "http://localhost:2000/api/auth/login",
      data,
      {
        withCredentials: true, 
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      customAlert("Login", error.response?.data, "error", "Ok")
      throw new Error(error.response?.data?.message || "An error occurred");
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}
