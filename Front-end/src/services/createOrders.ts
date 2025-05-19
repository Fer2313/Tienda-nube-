import { BodyOrder } from '@/interfaces/interfaces'
import axios from 'axios'

const createOrder = async (body: BodyOrder) => {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + '/api/order',
      body,
    )
    return response.data
  } catch (error) {
    console.log(error)
  }
}
export default createOrder
