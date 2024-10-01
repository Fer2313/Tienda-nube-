'use client'
import { subtitleSize, text, titleSize } from '@/chakraStyles/styles'
import Footer from '@/components/footer/Footer'
import NavBar from '@/components/navBar/NavBar'
import { MyFormValues, Products } from '@/interfaces/interfaces'
import getProductById from '@/services/getProductById'
import * as Yup from 'yup'
import {
  Box,
  Button,
  Heading,
  Image,
  Select,
  Spinner,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Field from '@/components/buy-comp/field'

export default function Page() {
  const [seletStock, setSelectStock] = useState(1)
  const [product, setProduct] = useState<Products>()
  const stock = product?.stock ? product?.stock : 0
  const BuySchema = Yup.object().shape({
    name: Yup.string().required('Requerido'),
    lastName: Yup.string().required('Requerido'),
    email: Yup.string().email('Debe ser un email.').required('Requerido'),
    cellphone: Yup.string().required('Requerido'),
    province: Yup.string().required('Requerido'),
    city: Yup.string().required('Requerido'),
    street: Yup.string().required('Requerido'),
    number: Yup.string().required('Requerido'),
  })

  const arr = Array.from({ length: stock }, (_, i) => i + 1)

  async function getProductHandle(id: number) {
    const productReq = await getProductById(id)
    setProduct(productReq)
  }

  useEffect(() => {
    const path = window.location.pathname
    const productId = path.split('/').pop()
    getProductHandle(Number(productId))
  }, [])
  function handleSubmit(values: MyFormValues) {
    const data = values
    if (product && product.price) {
      data.amount = product.price * seletStock
    }
    console.log(data)
  }
  return (
    <>
      <NavBar></NavBar>
      {product ? (
        <Box
          display={'flex'}
          flexDir={{ base: 'column', lg: 'row' }}
          justifyContent={'center'}
          gap={10}
          alignItems={'start'}
          mt={20}
          mx={{ base: 5, sm: 20, md: 28, lg: 10 }}
        >
          <Box
            width={{ base: '100%', lg: '65%' }}
            display="flex"
            flexDir={{ base: 'column', md: 'row', lg: 'row' }}
            rounded={'5px'}
            gap={3}
            p={4}
            bgColor={'#D9D9D9'}
            textColor={'black'}
          >
            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              w={{ base: '100%', md: '35%', lg: '35%' }}
              backgroundColor={'white'}
            >
              <Image
                src={product?.images[0].imageUrl}
                alt="product"
                w={{ base: '200px', sm: '300px', md: '100%', lg: '100%' }}
              ></Image>
            </Box>
            <Box
              w={{ base: '100%', md: '65%', lg: '65%' }}
              display={'flex'}
              flexDir={'column'}
              gap={2}
            >
              <Heading color={'blue.600'} fontSize={titleSize}>
                Detalle de tu compra
              </Heading>
              <Box
                display={'flex'}
                flexDir={'column'}
                gap={3}
                alignItems={'start'}
              >
                <Text fontWeight="semibold" fontSize={subtitleSize}>
                  {product?.productName}
                </Text>
                <Box
                  display={'flex'}
                  gap={{
                    base: 2,
                    sm: 5,
                    md: 5,
                    lg: 5,
                  }}
                >
                  {product?.color ? (
                    <Box
                      fontSize={{ base: '12px', md: '15px', lg: '15px' }}
                      display={'flex'}
                      alignItems={'center'}
                      gap={2}
                    >
                      <Text fontWeight="semibold">Color:</Text>
                      <Text>{product?.color}</Text>
                    </Box>
                  ) : null}
                  {stock ? (
                    <Box
                      display={'flex'}
                      fontSize={{ base: '12px', md: '15px', lg: '15px' }}
                      alignItems={'center'}
                      gap={2}
                    >
                      <Text fontWeight="semibold">Cantidad:</Text>
                      <Select
                        value={seletStock}
                        onChange={(e) => setSelectStock(Number(e.target.value))}
                        bgColor={'white'}
                        rounded={'5px'}
                        border={1}
                        borderStyle={'solid'}
                        borderColor={'gray'}
                        size={'xs'}
                        w={65}
                      >
                        {arr.map((number, index) => (
                          <option key={index} value={number}>
                            {number}
                          </option>
                        ))}
                      </Select>
                    </Box>
                  ) : null}
                </Box>
                <Tag
                  colorScheme={'yellow'}
                  size={{ base: 'sm', md: 'md', lg: 'md' }}
                >
                  {product?.category}
                </Tag>
              </Box>
              <Box h={'100%'} display={'flex'} alignItems={'end'}>
                <Box
                  w={'100%'}
                  display={'flex'}
                  justifyContent={'end'}
                  alignItems={'center'}
                  gap={5}
                >
                  <Text
                    fontSize={subtitleSize}
                    textAlign={'center'}
                    fontWeight="semibold"
                  >
                    Costo toltal:{' '}
                    {product?.price ? '$' + product?.price * seletStock : '$0'}
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
          {product?.stock ? (
            <Box
              width={{ base: '100%', lg: '35%' }}
              p={4}
              rounded={'5px'}
              bgColor={'#D9D9D9'}
              textColor={'black'}
            >
              <Formik
                initialValues={{
                  name: '',
                  lastName: '',
                  email: '',
                  cellphone: '',
                  province: '',
                  city: '',
                  street: '',
                  number: '',
                  amount: 0,
                }}
                onSubmit={handleSubmit}
                validationSchema={BuySchema}
              >
                {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
                {(props) => (
                  <Form>
                    <Box>
                      <Heading color={'blue.600'} mb={3} fontSize={titleSize}>
                        Datos del comprador
                      </Heading>
                      <Stack spacing={3}>
                        <Box display={'flex'} gap={4}>
                          <Field
                            type="text"
                            Attribute="name"
                            placeholder="Nombre"
                          ></Field>
                          <Field
                            type="text"
                            Attribute="lastName"
                            placeholder="Apellido"
                          ></Field>
                        </Box>
                        <Field
                          type="text"
                          Attribute="email"
                          placeholder="Direccíon email"
                        ></Field>
                        <Field
                          type="number"
                          Attribute="cellphone"
                          placeholder="Numero de telefono"
                        ></Field>
                      </Stack>
                      <Heading color={'blue.600'} my={3} fontSize={titleSize}>
                        Datos de envío
                      </Heading>
                      <Stack spacing={3}>
                        <Box display={'flex'} gap={4}>
                          <Field
                            type="text"
                            Attribute="province"
                            placeholder="Provincia"
                          ></Field>
                          <Field
                            type="text"
                            Attribute="city"
                            placeholder="Ciudad o localidad"
                          ></Field>
                        </Box>
                        <Box display={'flex'} gap={4}>
                          <Field
                            type="text"
                            Attribute="street"
                            placeholder="Calle"
                          ></Field>
                          <Field
                            type="number"
                            Attribute="number"
                            placeholder="Numero de calle"
                          ></Field>
                        </Box>
                      </Stack>
                      <Text fontSize={text} my={3}>
                        <Link className="text-cyan-400" href="/login">
                          Inicia
                        </Link>{' '}
                        o{' '}
                        <Link className="text-red-400" href="/register">
                          registrate
                        </Link>{' '}
                        para guardar tus datos y poder hacer el proceso de
                        compra mas rapido
                      </Text>
                      <Button type="submit" w={'100%'} colorScheme="green">
                        Confirmar Compra
                      </Button>
                    </Box>
                  </Form>
                )}
              </Formik>
            </Box>
          ) : (
            <Tag
              width={{ base: '100%', lg: '35%' }}
              p={4}
              display={'flex'}
              justifyContent={'center'}
              colorScheme="red"
              textAlign={'center'}
            >
              No hay stock
            </Tag>
          )}
        </Box>
      ) : (
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          h={'500px'}
          w={'100%'}
        >
          <Spinner></Spinner>
        </Box>
      )}
      <Footer></Footer>
    </>
  )
}
