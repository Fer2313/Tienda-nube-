import { Filters } from '@/interfaces/interfaces'
import axios from 'axios'

export default async function filtersProducts(filters: Filters) {
  const url =
    process.env.NEXT_PUBLIC_API_URL + '/api/product/getProductsFilters?'
  try {
    let filterUrl = ''
    if (filters.category) {
      filterUrl = filterUrl + `category=${filters.category}&`
    }
    if (filters.name) {
      filterUrl = filterUrl + `name=${filters.name}&`
    }
    if (filters.page) {
      filterUrl = filterUrl + `page=${filters.page}&`
    }
    if (filters.pageSize) {
      filterUrl = filterUrl + `pageSize=${filters.pageSize}&`
    }
    if (filters.price) {
      filterUrl = filterUrl + `price=${filters.price}&`
    }
    if (filters.priceMax) {
      filterUrl = filterUrl + `priceMax=${filters.priceMax}&`
    }
    if (filters.priceMin) {
      filterUrl = filterUrl + `priceMin=${filters.priceMin}&`
    }
    console.log(filterUrl.slice(0, -1))
    const products = await axios.get(`${url}${filterUrl.slice(0, -1)}`)
    return products.data
  } catch (error) {
    return console.log(error)
  }
}
