'use client'
import Footer from '@/components/footer/Footer'
import Categories_section from '@/components/landing-comp/Categories_section'
import Header from '@/components/landing-comp/Header'
import Offers_section from '@/components/landing-comp/Offers_section'
import NavBar from '@/components/navBar/NavBar'
import { Products } from '@/interfaces/interfaces'
import { getProducts } from '@/services/getProducts'
import { Box, Spinner } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

export default function Landing() {
  const [products, setProducts] = useState<Products[]>([])

  async function getProductsHandler() {
    const productos = await getProducts(false)
    setProducts(productos)
  }
  useEffect(() => {
    getProductsHandler()
  }, [])
  return (
    <main className="flex flex-col">
      <NavBar></NavBar>
      {products && products.length ? (
        <section>
          <Header></Header>
          <article className="flex flex-col gap-20 mx-5 md:mx-10 lg:mx-10">
            <Offers_section products={products}></Offers_section>
            <Categories_section></Categories_section>
          </article>
        </section>
      ) : (
        <Box
          display="flex"
          justifyContent={'center'}
          alignItems={'center'}
          h={'500px'}
          w={'100%'}
        >
          <Spinner></Spinner>
        </Box>
      )}
      <Footer></Footer>
    </main>
  )
}
