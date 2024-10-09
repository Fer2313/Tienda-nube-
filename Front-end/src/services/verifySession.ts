import axios from 'axios'

export const verifySession = async () => {
  try {
    await axios.get(
      process.env.NEXT_PUBLIC_API_URL + '/api/auth/verify-session',
      {
        withCredentials: true,
      },
    )
    return true
  } catch (error) {
    if (error) {
      console.log(error)
      return false
    }
  }
}
