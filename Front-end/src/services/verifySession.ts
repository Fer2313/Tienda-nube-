import axios from "axios";

export const verifySession = async () => {
    try {
        await axios.get(
            'http://localhost:2000/api/verify-session',
            {
              withCredentials: true, 
            }
          );
      return true 
    } catch (error) {
      console.error('Error verificando la sesión:', error);
      return false
    }
  };