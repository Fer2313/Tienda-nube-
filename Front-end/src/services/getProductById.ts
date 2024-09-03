import axios from "axios";

export default async function getProductById(id: number) {
  try {
    const product = await axios.get(`http://localhost:2000/api/product/getProduct/${id}`)
    return product.data
  } catch (error) {
    return console.log(error);
  }
}
