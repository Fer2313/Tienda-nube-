export interface Products {
  productId: number
  productName: string
  description: string
  price: number | null
  stock: number | null
  color: string
  category: string
  images: Image[]
}
export interface myFormRegValues {
  name: string
  lastName: string
  email: string
  cellphone: string
  password: string
  repeatPassword: string
}

export interface myFormLogValues {
  email: string
  password: string
}
export interface MyFormValues {
  amount: number
  name: string
  lastName: string
  email: string
  cellphone: number | string
  province: string
  city: string
  street: string
  number: number | string
}
export interface MyCompletData {
  name: string
  lastName: string
  email: string
  cellphone: number | string
  province: string
  city: string
  street: string
  number: number | string
  amount: number | undefined | null
}

export interface Image {
  id: number
  imageUrl: string
  productId: number
}

export interface StyleClases {
  [key: string]: string
}

export interface Filters {
  category: string | undefined
  priceMin: number | undefined
  priceMax: number | undefined
  price: string | undefined
  name: string | undefined
  page: number
  pageSize: number
}
