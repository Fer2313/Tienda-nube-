import { Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Products_Carrusel from '../landing-comp/Products_carrusel'
import { titleSize } from '@/chakraStyles/styles'
import { getProducts } from '@/services/getProducts'
import { Products } from '@/interfaces/interfaces'

export default function Recomend_carrusel({ id }: { id: number }) {
  const [products, setProducts] = useState<Products[]>([])
  async function getProductsHandler() {
    const productos = await getProducts(id)
    setProducts(productos)
  }

  useEffect(() => {
    getProductsHandler()
  }, [])

  return (
    <main className="mt-10">
      <Text my={5} fontSize={titleSize}>
        Productos recomendados
      </Text>
      <Products_Carrusel products={products}></Products_Carrusel>
    </main>
  )
}
