'use client'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Text,
} from '@chakra-ui/react'
import perfil from '../../../public/Generic avatar.png'
import carrito from '../../../public/Icon Button.png'
import { IoCloseOutline, IoReorderThreeOutline } from 'react-icons/io5'
import React, { useEffect, useState } from 'react'
import { Button } from '../Button'
import Link from 'next/link'
import Image from 'next/image'

export function MyAccordionContent({ token }: { token: string | unknown }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }
  return (
    <Accordion borderColor={'#282828'} bgColor={'#282828'} allowToggle>
      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton display={'flex'} justifyContent={'center'}>
                {isExpanded ? (
                  <IoCloseOutline color="white" size={30} />
                ) : (
                  <IoReorderThreeOutline color="white" size={30} />
                )}
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <div className="flex gap-2 justify-around">
                {token ? (
                  <Link href="/cart" className="flex gap-2 items-center">
                    <Image src={carrito} alt="carrito" width={32}></Image>
                    <Text>Carrito</Text>
                  </Link>
                ) : (
                  <Link href="/login">
                    <Button
                      text="Ingresar"
                      background="blue"
                      hover="blue"
                      fontsize="sm"
                      color="white"
                      onClick={undefined}
                    ></Button>
                  </Link>
                )}
                {token ? (
                  <Link href="/profile" className="flex gap-2 items-center">
                    <Image src={perfil} alt="perfil" width={32}></Image>
                    <Text>Cuenta</Text>
                  </Link>
                ) : (
                  <Link href="/register">
                    <Button
                      text="Registrarse"
                      background="white"
                      fontsize="sm"
                      hover="slate"
                      color="blue"
                      border="blue"
                      onClick={undefined}
                    ></Button>
                  </Link>
                )}
              </div>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  )
}
