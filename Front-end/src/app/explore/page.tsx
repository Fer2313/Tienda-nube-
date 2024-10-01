'use client'
import ProductCard from '@/components/Card'
import Footer from '@/components/footer/Footer'
import NavBar from '@/components/navBar/NavBar'
import { Products } from '@/interfaces/interfaces'
import filtersProducts from '@/services/filtersProducts'
import useStoreProduct from '@/store/product'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect } from 'react'
import Filters from '@/components/explore-comp/Filters'
import { Box, Spinner } from '@chakra-ui/react'
import Paginate from '@/components/explore-comp/Paginate'

export default function Page() {
  const { products, setFilters, setProducts } = useStoreProduct()
  useEffect(() => {
    async function initExplore() {
      const filtersDefault = {
        category: undefined,
        page: 1,
        pageSize: 9,
        priceMin: undefined,
        priceMax: undefined,
        price: undefined,
        name: undefined,
      }
      setFilters(filtersDefault)
      const products = await filtersProducts(filtersDefault)
      setProducts(products)
    }
    if (!products.productsCount) {
      initExplore()
    }
  }, [products, setFilters, setProducts])

  return (
    <main>
      <NavBar></NavBar>
      <div>
        {products.productsCount ? (
          <Box className="flex flex-col mt-5 md:mt-10 lg:mt-15 mx-5 md:mx-10 lg:mx-10 gap-9">
            <Filters></Filters>
            <Box
              display="grid"
              gridTemplateColumns={{
                base: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
              }}
              gap={6}
            >
              {products.productsData.map((product: Products, index: number) => (
                <Box key={index} className="flex flex-col items-center">
                  <ProductCard product={product}></ProductCard>
                </Box>
              ))}
            </Box>
            <Paginate></Paginate>
          </Box>
        ) : (
          <Box
            display={'flex'}
            w={'100%'}
            h={'500px'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Spinner></Spinner>
          </Box>
        )}
      </div>
      <Footer></Footer>
    </main>
  )
}
