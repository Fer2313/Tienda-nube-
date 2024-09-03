import axios from "axios";

export default async function protegedRute() {
  try {
    const response = await axios.get("http://localhost:2000/protected-rute", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return console.log(error);
  }
}
