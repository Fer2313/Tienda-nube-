import axios from 'axios'
import { customAlert } from './alert'
import { myFormLogValues } from '@/interfaces/interfaces'

export default async function loginFunction(data: myFormLogValues) {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + '/api/auth/login',
      data,
      {
        withCredentials: true,
      },
    )
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      customAlert('Login', error.response?.data, 'error', 'Ok')
      throw new Error(error.response?.data?.message || 'An error occurred')
    } else {
      console.error('Unexpected error:', error)
      throw new Error('An unexpected error occurred')
    }
  }
}
