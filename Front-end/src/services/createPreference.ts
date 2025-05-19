import axios from 'axios'

const createPreference = async (
  userId: number,
  idProduct: number | undefined,
  title: string | undefined,
  quantity: number,
  price: number | undefined | null,
) => {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + '/api/buy/create_preference',
      {
        userId,
        idProduct,
        title,
        quantity,
        price,
      },
    )
    const { id } = response.data
    return id
  } catch (error) {
    console.log(error)
  }
}

export default createPreference
