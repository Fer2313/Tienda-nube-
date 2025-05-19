import { MyFormValues } from '@/interfaces/interfaces'
import axios from 'axios'

export default async function createNotRegisterUser(user: MyFormValues) {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + '/api/auth/create_not_register_user',
      user,
    )
    return response.data
  } catch (error) {
    return console.log(error)
  }
}
