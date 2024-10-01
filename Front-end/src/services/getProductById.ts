import axios from 'axios'

export default async function getProductById(id: number) {
  try {
    const product = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/product/getProduct/${id}`,
    )
    return product.data
  } catch (error) {
    return console.log(error)
  }
}
