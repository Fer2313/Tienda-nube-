import axios from "axios";

export const getProducts = async (id:any) => {
  try {
    let products;
    if (!id) {
      products = await axios.get(
        "http://localhost:2000/api/product/getProducts"
      );
    } else {
      products = await axios.get(`http://localhost:2000/api/product/getProducts?id=${id}`
      );
    }
    return products.data;
  } catch (error) {
    return console.log(error);
  }
};
