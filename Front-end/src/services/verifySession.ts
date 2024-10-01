import axios from 'axios'

export const verifySession = async () => {
  try {
    await axios.get(process.env.NEXT_PUBLIC_API_URL + '/api/verify-session', {
      withCredentials: true,
    })
    return true
  } catch (error) {
    console.error('Error verificando la sesión:', error)
    return false
  }
}
