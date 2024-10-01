'use client'
import React, { useEffect, useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Text,
  Tag,
  RadioGroup,
  Radio,
} from '@chakra-ui/react'

import { titleSize } from '@/chakraStyles/styles'
import getProductsByName from '@/services/getProductByName'
import Link from 'next/link'
import Images_Products from './Images_Products'
import { Products } from '@/interfaces/interfaces'
interface Props {
  product: Products
}
export default function CardComponent({ product }: Props) {
  const [productsColor, setProductsColor] = useState<Products[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const [descriptionMobile, setDescriptionMobile] = useState(false)
  async function getProductsColor(name: string, color: boolean) {
    const productReq = await getProductsByName(name, color)
    setProductsColor(productReq)
  }
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    console.log(product)
    getProductsColor(product.productName, true)
    // Ejecutar al cargar el componente
    handleResize()

    // Añadir el listener para el redimensionamiento
    window.addEventListener('resize', handleResize)

    // Limpiar el listener al desmontar el componente
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return (
    <div>
      <Card
        direction={{ base: 'column', sm: 'column', md: 'row', lg: 'row' }}
        overflow="hidden"
        variant="outline"
        bgColor={'#2C2C2C'}
        textColor={'white'}
      >
        <Box
          w={{ base: '100%', md: '450px', lg: '500px' }}
          h={{ base: '100%', md: '450px', lg: '500px' }}
        >
          <Images_Products
            w={'100%'}
            h={'100%'}
            images={product.images}
          ></Images_Products>
        </Box>
        <Stack>
          <CardBody>
            <Heading size={{ base: 'sm', md: 'md', lg: 'lg' }}>
              {product.productName}
            </Heading>
            <Text py="2" fontSize={titleSize} fontWeight={'semibold'}>
              {product?.price ? '$' + product?.price : '$0'}
            </Text>
            <Box
              display={'flex'}
              flexDir={'column'}
              gap={2}
              alignItems={'start'}
            >
              {!isMobile ? (
                <Text
                  className="product-details"
                  fontSize={{ base: '9px', lg: '14px' }}
                >
                  {product.description}
                </Text>
              ) : null}
              {descriptionMobile ? (
                <Text
                  className="product-details"
                  fontSize={{ base: '9px', lg: '14px' }}
                >
                  {product.description}
                </Text>
              ) : null}
              {isMobile ? (
                <section>
                  {!descriptionMobile ? (
                    <Text
                      cursor="pointer"
                      textDecoration="underline"
                      fontSize={{ base: '9px', lg: '14px' }}
                      onClick={() => {
                        setDescriptionMobile(true)
                      }}
                    >
                      Mostrar descripcion.
                    </Text>
                  ) : null}
                  {descriptionMobile ? (
                    <Text
                      cursor="pointer"
                      textDecoration="underline"
                      fontSize={{ base: '9px', lg: '14px' }}
                      onClick={() => {
                        setDescriptionMobile(false)
                      }}
                    >
                      Ocultar descripcion.
                    </Text>
                  ) : null}
                </section>
              ) : null}
              {product.color ? (
                <RadioGroup value={String(product.productId)}>
                  <Text fontSize={{ base: '10px', md: '16px', lg: '20px' }}>
                    Color
                  </Text>
                  <Stack direction="row" wrap="wrap">
                    {productsColor.map((pColor: Products, index: number) => (
                      <Link href={'/product/' + pColor.productId} key={index}>
                        <Radio value={String(pColor.productId)}>
                          <Text
                            fontSize={{
                              base: '9px',
                              md: '11px',
                              lg: '16px',
                            }}
                          >
                            {pColor.color}
                          </Text>
                        </Radio>
                      </Link>
                    ))}
                  </Stack>
                </RadioGroup>
              ) : null}
              <Tag
                colorScheme={'yellow'}
                size={{ base: 'sm', md: 'md', lg: 'lg' }}
              >
                {product.category}
              </Tag>
            </Box>
          </CardBody>

          <CardFooter>
            <ButtonGroup>
              <Link href={`/buy/${product.productId}`}>
                <Button variant="solid" textColor={'white'} colorScheme="blue">
                  Comprar
                </Button>
              </Link>
              <Button variant="solid" textColor={'white'} colorScheme="orange">
                <FaShoppingCart></FaShoppingCart>
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Stack>
      </Card>
    </div>
  )
}
