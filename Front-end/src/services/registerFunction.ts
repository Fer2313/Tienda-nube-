import axios from 'axios'
import { customAlert } from './alert'
import { myFormRegValues } from '@/interfaces/interfaces'

export default async function registerFunction(data: myFormRegValues) {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + '/api/auth/register',
      data,
    )
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      customAlert('Registro', error.response?.data, 'error', 'Ok')
      throw new Error(error.response?.data?.message || 'An error occurred')
    } else {
      console.error('Unexpected error:', error)
      throw new Error('An unexpected error occurred')
    }
  }
}
