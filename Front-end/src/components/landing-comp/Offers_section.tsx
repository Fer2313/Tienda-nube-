import { titleSize } from '@/chakraStyles/styles'
import { Divider, Text } from '@chakra-ui/react'
import React from 'react'
import Products_Carrusel from './Products_carrusel'
import { Products } from '@/interfaces/interfaces'
interface Props {
  products: Products[] // Define products como propiedad
}

export default function Offers_section({ products }: Props) {
  return (
    <main className="mt-20">
      <Divider />
      <Text m={5} fontSize={titleSize}>
        Nuestras Ofertas
      </Text>
      <Products_Carrusel products={products}></Products_Carrusel>
    </main>
  )
}
