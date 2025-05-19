'use client'
import { titleSize } from '@/chakraStyles/styles'
import { Products } from '@/interfaces/interfaces'
import createPreference from '@/services/createPreference'
import getUserById from '@/services/getUserById'
import { Box, Button, Heading, Input, Stack } from '@chakra-ui/react'
import { Wallet } from '@mercadopago/sdk-react'
import React, { useEffect, useState } from 'react'

export default function FormUser({
  id,
  product,
  seletStock,
}: {
  id: number | undefined
  product: Products
  seletStock: number
}) {
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
  })
  useEffect(() => {
    const getUser = async () => {
      const user = await getUserById(id)
      console.log(user)
      if (user.address) {
        setUserData({
          ...user,
          country: user.address.split('-')[0],
          state: user.address.split('-')[1],
          locality: user.address.split('-')[2],
          street: user.address.split('-')[3],
          number: user.address.split('-')[4],
        })
      } else {
        setUserData({
          ...user,
        })
      }
    }
    if (!userData.name) {
      getUser()
    }
  }, [id, userData])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [preferenceId, setPreferenceId] = useState<any>()
  const handleBuy = async (userId: number | undefined) => {
    if (userId !== undefined) {
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
  }

  return (
    <main>
      <Box>
        <Heading color={'blue.600'} mb={3} fontSize={titleSize}>
          Datos del comprador
        </Heading>
        <Stack spacing={3}>
          <Box display={'flex'} gap={4}>
            <Input></Input>
            <Input></Input>
          </Box>
          <Input></Input>
          <Input></Input>
        </Stack>
        <Heading color={'blue.600'} my={3} fontSize={titleSize}>
          Datos de envío
        </Heading>
        <Stack spacing={3}>
          <Box display={'flex'} gap={4}>
            <Input></Input>
            <Input></Input>
          </Box>
          <Box display={'flex'} gap={4}>
            <Input></Input>
            <Input></Input>
          </Box>
        </Stack>
        {!preferenceId && (
          <Button onClick={() => handleBuy(id)} w={'100%'} colorScheme="green">
            Comprar
          </Button>
        )}
        {preferenceId && (
          <Wallet initialization={{ preferenceId: preferenceId }} />
        )}
      </Box>
    </main>
  )
}
