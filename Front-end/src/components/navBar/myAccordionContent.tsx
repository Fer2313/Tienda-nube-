'use client'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Text,
  Box,
} from '@chakra-ui/react'
import { IoCloseOutline, IoReorderThreeOutline } from 'react-icons/io5'
import React, { useEffect, useState } from 'react'
import { Button } from '../Button'
import Link from 'next/link'
import { FaShoppingCart } from 'react-icons/fa'
import PerfilAccordion from './PerfilAccordion'
import { sessionData } from '@/interfaces/interfaces'

export function MyAccordionContent({
  token,
  sessionData,
}: {
  token: string | unknown
  sessionData: sessionData | undefined
}) {
  const [isClient, setIsClient] = useState(false)
  const isMobile = true

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
            <AccordionPanel pb={2}>
              <div className="flex items-center">
                {token ? (
                  <Box w={'50%'} display={'flex'} justifyContent={'center'}>
                    <Link href="/cart">
                      <Box className="flex flex-col items-center gap-1">
                        <Box className="flex items-center bg-yellow-500 p-2 rounded-full">
                          <FaShoppingCart></FaShoppingCart>
                        </Box>
                        <Text>Carrito</Text>
                      </Box>
                    </Link>
                  </Box>
                ) : (
                  <Box w={'50%'} display={'flex'} justifyContent={'center'}>
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
                  </Box>
                )}
                {token ? (
                  <Box w={'50%'} display={'flex'} justifyContent={'center'}>
                    <PerfilAccordion
                      sessionData={sessionData}
                      isMobile={isMobile}
                    ></PerfilAccordion>
                  </Box>
                ) : (
                  <Box w={'50%'} display={'flex'} justifyContent={'center'}>
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
                  </Box>
                )}
              </div>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  )
}
