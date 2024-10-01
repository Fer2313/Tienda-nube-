import { Filters, Products } from '@/interfaces/interfaces'
import { create } from 'zustand'

type StoreProduct = {
  setFilters: (newFilters: Filters) => void
  setProducts: (newProducts: products) => void
  products: products
  filters: Filters
}

interface products {
  productsCount: number
  productsData: Products[]
}

const useStoreProduct = create<StoreProduct>((set) => ({
  products: {
    productsCount: 0,
    productsData: [
      {
        productId: 0,
        productName: '',
        description: '',
        price: null,
        stock: null,
        color: '',
        category: '',
        images: [
          {
            id: 0,
            imageUrl: '',
            productId: 0,
          },
        ],
      },
    ],
  },
  filters: {
    category: '',
    priceMin: 0,
    priceMax: 0,
    price: '',
    name: '',
    page: 0,
    pageSize: 0,
  },
  setFilters: (newFilters: Filters) =>
    set((state: StoreProduct) => ({
      filters: (state.filters = newFilters),
    })),
  setProducts: (newProducts: products) =>
    set((state: StoreProduct) => ({
      products: (state.products = newProducts),
    })),
}))

export default useStoreProduct
