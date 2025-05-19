'use client'
import { subtitleSize, text, titleSize } from '@/chakraStyles/styles'
import Footer from '@/components/footer/Footer'
import NavBar from '@/components/navBar/NavBar'
import { MyFormValues, Products } from '@/interfaces/interfaces'
import getProductById from '@/services/getProductById'
import * as Yup from 'yup'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
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
import createPreference from '@/services/createPreference'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import createNotRegisterUser from '@/services/createNotRegisterUser'
import useAuthStore from '@/store/auth'
import createOrder from '@/services/createOrders'
import getUserById from '@/services/getUserById'
import { FaEye, FaRegEyeSlash } from 'react-icons/fa'

export default function Page() {
  const [seletStock, setSelectStock] = useState(1)
  const [missingData, setMissingData] = useState(false)
  const [product, setProduct] = useState<Products>()
  const [eye, setEye] = useState<boolean>(false)
  const { isAuthenticated, sessionData } = useAuthStore()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [preferenceId, setPreferenceId] = useState<any>()
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
  initMercadoPago('APP_USR-eb16ba07-30c6-4810-9d3c-96a0b19d0031', {
    locale: 'es-AR',
  })

  function maskEmail(email: string) {
    const [localPart, domain] = email.split('@')
    const maskedLocalPart =
      localPart.slice(0, 3) + '*'.repeat(localPart.length - 3)
    return `${maskedLocalPart}@${domain}`
  }
  const [userData, setUserData] = useState({
    name: '',
    lastName: '',
    email: '',
    cellphone: '',
    address: '',
    maskEmail: '',
    province: '',
    state: '',
    country: '',
    locality: '',
    street: '',
    number: '',
  })

  const arr = Array.from({ length: stock }, (_, i) => i + 1)

  async function getProductHandle(id: number) {
    const productReq = await getProductById(id)
    setProduct(productReq)
  }

  const handleBuy = async (userId: number) => {
    const id = await createPreference(
      userId,
      product?.productId,
      product?.productName,
      seletStock,
      product?.price,
    )
    if (id) {
      setPreferenceId(id)
    }
  }

  useEffect(() => {
    const getUser = async () => {
      const user = await getUserById(sessionData?.userId)
      if (
        !user.name ||
        !user.lastName ||
        !user.email ||
        !user.cellphone ||
        !user.address
      ) {
        setMissingData(true)
      } else {
        if (user.address) {
          setUserData({
            ...user,
            country: user.address.split('-')[0],
            state: user.address.split('-')[1],
            locality: user.address.split('-')[2],
            street: user.address.split('-')[3],
            number: user.address.split('-')[4],
            maskEmail: maskEmail(user.email),
          })
        } else {
          setUserData({
            ...user,
            maskEmail: maskEmail(user.email),
          })
        }
        setMissingData(false)
      }
    }
    if (!userData.name) {
      getUser()
    }
    const path = window.location.pathname
    const productId = path.split('/').pop()
    getProductHandle(Number(productId))
  }, [sessionData?.userId, userData.name])

  async function handleSubmit(values: MyFormValues) {
    const data = values
    if (product && product.price) {
      data.amount = product.price * seletStock
    }
    if (!isAuthenticated) {
      const response = await createNotRegisterUser(data)
      const body = {
        order: {
          userId: response.id,
          totalAmount: product?.price ? product?.price * seletStock : 0,
          status: 'pending',
        },
        orderDetails: [
          {
            productId: product?.productId,
            amount: product?.price ? product?.price * seletStock : 0,
            price: product?.price,
          },
        ],
      }
      await createOrder(body)
      handleBuy(response.id)
    } else {
      if (sessionData) {
        const body = {
          order: {
            userId: sessionData.userId,
            totalAmount: product?.price ? product?.price * seletStock : 0,
            status: 'pending',
          },
          orderDetails: [
            {
              productId: product?.productId,
              amount: product?.price ? product?.price * seletStock : 0,
              price: product?.price,
            },
          ],
        }
        await createOrder(body)
        handleBuy(sessionData.userId)
      }
    }
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
                        disabled={preferenceId}
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
              {/* TODO Crear un formulario para los usuarios registrados */}
              {isAuthenticated ? (
                <Box>
                  {!missingData ? (
                    <Heading color={'blue.600'} mb={3} fontSize={titleSize}>
                      Datos del comprador
                    </Heading>
                  ) : (
                    <Box maxW="md" mx="auto" p="4">
                      <Alert
                        status="warning"
                        borderRadius="md"
                        variant="left-accent"
                      >
                        <AlertIcon />
                        <AlertTitle fontSize="lg">
                          Completa los datos de tu perfil para una mejor
                          experiencia.
                        </AlertTitle>
                      </Alert>
                      <Link href={'/profile'}>
                        <Button
                          mt="4"
                          colorScheme="teal"
                          size="md"
                          width="full"
                        >
                          Completar datos
                        </Button>
                      </Link>
                    </Box>
                  )}
                  {!missingData ? (
                    <Box>
                      <Stack spacing={3}>
                        <Box display={'flex'} gap={4}>
                          <Box>
                            <Text fontSize={'14px'}>Nombre</Text>
                            <Input
                              rounded={'5px'}
                              border={1}
                              size={{
                                base: 'xs',
                                sm: 'sm',
                                md: 'md',
                                lg: 'md',
                              }}
                              borderStyle={'solid'}
                              borderColor={'gray'}
                              bgColor="white"
                              disabled
                              value={userData.name}
                            ></Input>
                          </Box>
                          <Box>
                            <Text fontSize={'14px'}>Apellido</Text>
                            <Input
                              rounded={'5px'}
                              border={1}
                              size={{
                                base: 'xs',
                                sm: 'sm',
                                md: 'md',
                                lg: 'md',
                              }}
                              borderStyle={'solid'}
                              borderColor={'gray'}
                              bgColor="white"
                              value={userData.lastName}
                              disabled
                            ></Input>
                          </Box>
                        </Box>
                        <Box>
                          <Text fontSize={'14px'}>Email</Text>
                          <InputGroup
                            size={{ base: 'xs', sm: 'md', md: 'md', lg: 'md' }}
                          >
                            {eye ? (
                              <Input
                                size={{
                                  base: 'xs',
                                  sm: 'md',
                                  md: 'md',
                                  lg: 'md',
                                }}
                                disabled
                                bgColor={'white'}
                                value={userData.email}
                                type="email"
                                placeholder="Tu correo"
                              />
                            ) : (
                              <Input
                                disabled
                                bgColor={'white'}
                                value={userData.maskEmail}
                                type="email"
                                placeholder="Tu correo"
                              />
                            )}
                            <InputRightElement>
                              {!eye ? (
                                <button
                                  type="button"
                                  className="flex justify-center items-center rounded-r-sm hover:bg-slate-200 border"
                                  onClick={() => {
                                    setEye(true)
                                  }}
                                >
                                  <FaRegEyeSlash></FaRegEyeSlash>
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  className="flex justify-center items-center rounded-r-sm hover:bg-slate-200 border"
                                  onClick={() => {
                                    setEye(false)
                                  }}
                                >
                                  <FaEye></FaEye>
                                </button>
                              )}
                            </InputRightElement>
                          </InputGroup>
                        </Box>
                        <Box>
                          <Text fontSize={'14px'}>Telefono Celular</Text>
                          <Input
                            bgColor={'white'}
                            border={1}
                            borderColor={'gray'}
                            borderStyle={'solid'}
                            value={userData.cellphone}
                            disabled
                          ></Input>
                        </Box>
                      </Stack>
                      <Heading color={'blue.600'} my={3} fontSize={titleSize}>
                        Datos de envío
                      </Heading>
                      <Stack spacing={3} mb={3}>
                        <Box display={'flex'} gap={4}>
                          <Box>
                            <Text fontSize={'14px'}>Provincia</Text>
                            <Input
                              value={userData.state}
                              rounded={'5px'}
                              border={1}
                              size={{
                                base: 'xs',
                                sm: 'sm',
                                md: 'md',
                                lg: 'md',
                              }}
                              borderStyle={'solid'}
                              borderColor={'gray'}
                              bgColor="white"
                              disabled
                            ></Input>
                          </Box>
                          <Box>
                            <Text fontSize={'14px'}>Localidad</Text>
                            <Input
                              value={userData.locality}
                              rounded={'5px'}
                              border={1}
                              size={{
                                base: 'xs',
                                sm: 'sm',
                                md: 'md',
                                lg: 'md',
                              }}
                              borderStyle={'solid'}
                              borderColor={'gray'}
                              bgColor="white"
                              disabled
                            ></Input>
                          </Box>
                        </Box>
                        <Box display={'flex'} gap={4}>
                          <Box>
                            <Text fontSize={'14px'}>Calle</Text>
                            <Input
                              value={userData.street}
                              rounded={'5px'}
                              border={1}
                              size={{
                                base: 'xs',
                                sm: 'sm',
                                md: 'md',
                                lg: 'md',
                              }}
                              borderStyle={'solid'}
                              borderColor={'gray'}
                              bgColor="white"
                              disabled
                            ></Input>
                          </Box>
                          <Box>
                            <Text fontSize={'14px'}>Numero</Text>
                            <Input
                              value={userData.number}
                              rounded={'5px'}
                              border={1}
                              size={{
                                base: 'xs',
                                sm: 'sm',
                                md: 'md',
                                lg: 'md',
                              }}
                              borderStyle={'solid'}
                              borderColor={'gray'}
                              bgColor="white"
                              disabled
                            ></Input>
                          </Box>
                        </Box>
                      </Stack>
                      <Box
                        bg="blue.50"
                        p="4"
                        borderRadius="md"
                        borderWidth="1px"
                        borderColor="blue.200"
                        textAlign="center"
                        maxW="md"
                        m={3}
                        mx="auto"
                      >
                        <Text
                          fontSize="sm"
                          fontWeight="medium"
                          color="blue.700"
                        >
                          Si necesitas actualizar tus datos,{' '}
                          <Link
                            className="text-red-400 underline"
                            href="/profile"
                          >
                            revisa tu perfil.
                          </Link>
                        </Text>
                      </Box>
                      {!preferenceId && (
                        <Button
                          onClick={() =>
                            handleSubmit({
                              name: userData.name,
                              lastName: userData.lastName,
                              email: userData.email,
                              cellphone: userData.cellphone,
                              province: userData.province,
                              city: userData.locality,
                              street: userData.street,
                              number: userData.number,
                              amount: undefined,
                            })
                          }
                          w={'100%'}
                          colorScheme="green"
                        >
                          Comprar
                        </Button>
                      )}
                      {preferenceId && (
                        <Wallet
                          initialization={{ preferenceId: preferenceId }}
                        />
                      )}
                    </Box>
                  ) : null}
                </Box>
              ) : (
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
                              disabled={preferenceId ? true : false}
                              type="text"
                              Attribute="name"
                              placeholder="Nombre"
                            ></Field>
                            <Field
                              disabled={preferenceId ? true : false}
                              type="text"
                              Attribute="lastName"
                              placeholder="Apellido"
                            ></Field>
                          </Box>
                          <Field
                            disabled={preferenceId ? true : false}
                            type="text"
                            Attribute="email"
                            placeholder="Direccíon email"
                          ></Field>
                          <Field
                            disabled={preferenceId ? true : false}
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
                              disabled={preferenceId ? true : false}
                              type="text"
                              Attribute="province"
                              placeholder="Provincia"
                            ></Field>
                            <Field
                              disabled={preferenceId ? true : false}
                              type="text"
                              Attribute="city"
                              placeholder="Ciudad o localidad"
                            ></Field>
                          </Box>
                          <Box display={'flex'} gap={4}>
                            <Field
                              disabled={preferenceId ? true : false}
                              type="text"
                              Attribute="street"
                              placeholder="Calle"
                            ></Field>
                            <Field
                              disabled={preferenceId ? true : false}
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
                        {!preferenceId && (
                          <Button type="submit" w={'100%'} colorScheme="green">
                            Comprar
                          </Button>
                        )}
                        {preferenceId && (
                          <Wallet
                            initialization={{ preferenceId: preferenceId }}
                          />
                        )}
                      </Box>
                    </Form>
                  )}
                </Formik>
              )}
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
