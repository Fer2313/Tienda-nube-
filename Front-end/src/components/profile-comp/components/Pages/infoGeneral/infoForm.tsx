import React, { useEffect, useState } from 'react'
import { FaRegEyeSlash } from 'react-icons/fa'
import { FaEye } from 'react-icons/fa'
import {
  Avatar,
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react'
import getUserById from '@/services/getUserById'
import updateUserById from '@/services/updateUserById'
import { IoPerson } from 'react-icons/io5'

function maskEmail(email: string) {
  const [localPart, domain] = email.split('@')
  const maskedLocalPart =
    localPart.slice(0, 3) + '*'.repeat(localPart.length - 3)
  return `${maskedLocalPart}@${domain}`
}

const UserInfo = ({ id }: { id: number | undefined }) => {
  const [eye, setEye] = useState<boolean>(false)
  const [userData, setUserData] = useState({
    name: '',
    lastName: '',
    email: '',
    cellphone: '',
    address: '',
    country: '',
    state: '',
    locality: '',
    street: '',
    number: '',
    maskEmail: '',
    image: '',
  })

  async function handleSubmitUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (
      userData.country &&
      userData.state &&
      userData.locality &&
      userData.street &&
      userData.number
    ) {
      setUserData((user) => ({
        ...user,
        address: `${userData.country}-${userData.state}-${userData.locality}-${userData.street}-${userData.number}`,
      }))

      const body = {
        name: userData.name,
        lastName: userData.lastName,
        email: userData.email,
        cellphone: userData.cellphone,
        address: userData.address,
        image: userData.image,
      }
      await updateUserById(id, body)
    } else {
      console.log('faltan datos')
    }
  }

  function handleChangeUpdateData(e: {
    target: { name: string; value: string }
  }) {
    const { name, value } = e.target
    setUserData((props) => ({
      ...props,
      [name]: value,
    }))
  }

  useEffect(() => {
    const getUser = async () => {
      const user = await getUserById(id)
      console.log(user)
      const separator = user.address.split('-')
      setUserData({
        ...user,
        maskEmail: maskEmail(user.email),
        country: separator[0],
        state: separator[1],
        locality: separator[2],
        street: separator[3],
        number: separator[4],
      })
    }

    getUser()
  }, [id])

  return (
    <main className="flex justify-center">
      {userData ? (
        <Box
          bgColor={'white'}
          py={{ base: 3, sm: 10, md: 10, lg: 10 }}
          textColor={'black'}
          borderRadius={{ base: 'none', sm: 'md', md: 'md', lg: 'md' }}
          maxWidth="500px"
          mt={10}
          mx="0"
          px={{ base: 3, sm: 10, md: 10, lg: 10 }}
          boxShadow="lg"
        >
          <Center mb={6}>
            <Box w={24} h={24} position={'relative'}>
              {userData.image ? (
                <Avatar size="xl" name="Cliente" src={userData?.image} />
              ) : null}

              <Box
                p={2}
                rounded={'full'}
                bgColor={'gray.400'}
                position={'absolute'}
                right={0}
                bottom={0}
              >
                <IoPerson />
              </Box>
            </Box>
          </Center>
          <form onSubmit={handleSubmitUpdate}>
            <VStack spacing={3}>
              <Box display={'flex'} flexDir={'column'} gap={2}>
                <Text textColor="black" fontWeight={'semibold'}>
                  Escoger imagen de perfil
                </Text>
                <Box
                  display={'flex'}
                  flexWrap={'wrap'}
                  gap={1}
                  justifyContent={'center'}
                >
                  <Box
                    cursor="pointer"
                    border={2}
                    p={1}
                    onClick={() => {
                      setUserData((user) => ({
                        ...user,
                        image:
                          'https://res.cloudinary.com/demvpwsim/image/upload/v1730387114/muyolvcct8evtar225iq.png',
                      }))
                    }}
                    borderStyle={'solid'}
                    borderColor={
                      'https://res.cloudinary.com/demvpwsim/image/upload/v1730387114/muyolvcct8evtar225iq.png' ===
                      userData.image
                        ? 'blue.400'
                        : 'white'
                    }
                  >
                    <Avatar
                      size="md"
                      name="Cliente"
                      src={
                        'https://res.cloudinary.com/demvpwsim/image/upload/v1730387114/muyolvcct8evtar225iq.png'
                      }
                    />
                  </Box>
                  <Box
                    cursor="pointer"
                    border={2}
                    p={1}
                    onClick={() => {
                      setUserData((user) => ({
                        ...user,
                        image:
                          'https://res.cloudinary.com/demvpwsim/image/upload/v1730387630/fxjrhuzsyvn8t96ae3mt.webp',
                      }))
                    }}
                    borderStyle={'solid'}
                    borderColor={
                      'https://res.cloudinary.com/demvpwsim/image/upload/v1730387630/fxjrhuzsyvn8t96ae3mt.webp' ===
                      userData.image
                        ? 'blue.400'
                        : 'white'
                    }
                  >
                    <Avatar
                      size="md"
                      name="Cliente"
                      src={
                        'https://res.cloudinary.com/demvpwsim/image/upload/v1730387630/fxjrhuzsyvn8t96ae3mt.webp'
                      }
                    />
                  </Box>
                </Box>
              </Box>
              <HStack spacing={{ base: 2, sm: 3, md: 3, lg: 3 }} width="100%">
                <FormControl id="name" isRequired>
                  <FormLabel
                    fontSize={{ base: 'sm', sm: 'md', md: 'md', lg: 'md' }}
                  >
                    Nombre
                  </FormLabel>
                  <Input
                    size={{ base: 'xs', sm: 'md', md: 'md', lg: 'md' }}
                    onChange={handleChangeUpdateData}
                    name="name"
                    value={userData.name}
                    type="text"
                    placeholder="Nombre"
                  />
                </FormControl>

                <FormControl id="lastName" isRequired>
                  <FormLabel
                    fontSize={{ base: 'sm', sm: 'md', md: 'md', lg: 'md' }}
                  >
                    Apellido
                  </FormLabel>
                  <Input
                    size={{ base: 'xs', sm: 'md', md: 'md', lg: 'md' }}
                    onChange={handleChangeUpdateData}
                    name="lastName"
                    value={userData.lastName}
                    type="text"
                    placeholder="Apellido"
                  />
                </FormControl>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel
                  fontSize={{ base: 'sm', sm: 'md', md: 'md', lg: 'md' }}
                >
                  Correo Electrónico
                </FormLabel>
                <InputGroup size={{ base: 'xs', sm: 'md', md: 'md', lg: 'md' }}>
                  {eye ? (
                    <Input
                      size={{ base: 'xs', sm: 'md', md: 'md', lg: 'md' }}
                      disabled
                      bgColor={'grey.100'}
                      value={userData.email}
                      type="email"
                      placeholder="Tu correo"
                    />
                  ) : (
                    <Input
                      disabled
                      bgColor={'grey.100'}
                      value={userData.maskEmail}
                      type="email"
                      placeholder="Tu correo"
                    />
                  )}
                  <InputRightElement>
                    {!eye ? (
                      <Button
                        size={{ base: 'xs', sm: 'md', md: 'md', lg: 'md' }}
                        onClick={() => {
                          setEye(true)
                        }}
                        p={0}
                        roundedRight={3}
                        rounded={0}
                      >
                        <FaRegEyeSlash></FaRegEyeSlash>
                      </Button>
                    ) : (
                      <Button
                        size={{ base: 'xs', sm: 'md', md: 'md', lg: 'md' }}
                        bgColor="white"
                        border={1}
                        borderStyle={'solid'}
                        borderColor={'gray.100'}
                        p={0}
                        roundedRight={3}
                        rounded={0}
                        onClick={() => {
                          setEye(false)
                        }}
                      >
                        <FaEye></FaEye>
                      </Button>
                    )}
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="cellphone" isRequired>
                <FormLabel
                  fontSize={{ base: 'sm', sm: 'md', md: 'md', lg: 'md' }}
                >
                  Teléfono
                </FormLabel>
                <Input
                  size={{ base: 'xs', sm: 'md', md: 'md', lg: 'md' }}
                  onChange={handleChangeUpdateData}
                  name="cellphone"
                  value={userData.cellphone}
                  type="tel"
                  placeholder="Número de teléfono"
                />
              </FormControl>
              <FormControl id="direction" isRequired>
                <FormLabel
                  fontSize={{ base: 'sm', sm: 'md', md: 'md', lg: 'md' }}
                >
                  Dirección
                </FormLabel>
                <Box display="flex" flexDir={'column'} gap={3}>
                  <InputGroup display="flex" gap={2}>
                    <Input
                      size={{ base: 'xs', sm: 'md', md: 'md', lg: 'md' }}
                      onChange={handleChangeUpdateData}
                      name="country"
                      value={userData.country}
                      type="text"
                      placeholder="Pais"
                    />
                    <Input
                      size={{ base: 'xs', sm: 'md', md: 'md', lg: 'md' }}
                      onChange={handleChangeUpdateData}
                      name="state"
                      value={userData.state}
                      type="text"
                      placeholder="Provincia"
                    />
                  </InputGroup>
                  <InputGroup display="flex" gap={2}>
                    <Input
                      size={{ base: 'xs', sm: 'md', md: 'md', lg: 'md' }}
                      width={'50%'}
                      onChange={handleChangeUpdateData}
                      name="locality"
                      value={userData.locality}
                      type="text"
                      placeholder="Localidad"
                    />
                    <Input
                      size={{ base: 'xs', sm: 'md', md: 'md', lg: 'md' }}
                      width={'30%'}
                      onChange={handleChangeUpdateData}
                      name="street"
                      value={userData.street}
                      type="text"
                      placeholder="Barrio"
                    />
                    <Input
                      size={{ base: 'xs', sm: 'md', md: 'md', lg: 'md' }}
                      width={'25%'}
                      onChange={handleChangeUpdateData}
                      name="number"
                      value={userData.number}
                      type="number"
                      placeholder="Numero"
                    />
                  </InputGroup>
                </Box>
              </FormControl>
              <Button type="submit" colorScheme="teal" size="md" width="full">
                Guardar Cambios
              </Button>
            </VStack>
          </form>
        </Box>
      ) : (
        <Box
          display="flex"
          justifyContent={'center'}
          alignItems={'center'}
          h={'500px'}
          w={'100%'}
        >
          <Spinner size={'lg'}></Spinner>
        </Box>
      )}
    </main>
  )
}

export default UserInfo
