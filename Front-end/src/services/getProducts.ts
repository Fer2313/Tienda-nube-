import axios from 'axios'

export const getProducts = async (id: number | boolean) => {
  try {
    let products
    if (!id) {
      products = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product/getProducts`,
      )
    } else {
      products = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product/getProducts?id=${id}`,
      )
    }
    return products.data
  } catch (error) {
    return console.log(error)
  }
}
