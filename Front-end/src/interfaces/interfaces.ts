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

export interface sessionData {
  userId: number
  name: string
  image: string | undefined
  lastName: string
  role: string
}

export interface myFormLogValues {
  email: string
  password: string
}
export interface BodyOrder {
  order: Order
  orderDetails: OrderDetail[]
}

export interface Order {
  userId: number
  totalAmount: number
  status: string
}

export interface OrderDetail {
  productId: number | undefined
  amount: number
  price: number | null | undefined
}
export interface MyFormValues {
  amount: number | undefined
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

export interface UserData {
  name: string
  lastName: string
  email: string
  cellphone: number | string
  address: string
  image: string
}
