'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Ico from '../../../public/Icon.jpg'
import { SearchIcon } from './SearchIcon'
import { Button } from '../Button'
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Tooltip,
} from '@chakra-ui/react'
import { MyAccordionContent } from './myAccordionContent'
import Link from 'next/link'
import { FaShoppingCart } from 'react-icons/fa'
import useAuthStore from '@/store/auth'
import PerfilAccordion from './PerfilAccordion'

export default function NavBar() {
  const [isMobile, setIsMobile] = useState(false)
  const { isAuthenticated, checkAuth, session, sessionData } = useAuthStore()

  useEffect(() => {
    const verify = async () => {
      await checkAuth()
    }
    const getSession = async () => {
      await session()
    }
    verify()
    getSession()
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768) // Puedes ajustar el umbral de tamaño
    }

    // Ejecutar al cargar el componente
    handleResize()

    // Añadir el listener para el redimensionamiento
    window.addEventListener('resize', handleResize)

    // Limpiar el listener al desmontar el componente
    return () => window.removeEventListener('resize', handleResize)
  }, [checkAuth])

  return (
    <article>
      <nav className="flex bg-[#282828] px-5 py-3 gap-2 items-center justify-between">
        {/* icon */}
        <Box
          w={{ base: '100%', md: '500px', lg: '650px' }}
          display={'flex'}
          gap={{ base: 5, sm: 10, md: 10, lg: 10 }}
          alignItems={'center'}
        >
          <Link href={'/'}>
            <Image
              className="rounded-full"
              src={Ico}
              alt="Icono"
              width={60}
            ></Image>
          </Link>
          {/* search */}
          <InputGroup w="100%" color={'black'} size={{ base: 'sm', lg: 'md' }}>
            <Input
              bgColor={'white'}
              placeholder={
                isMobile ? '¿Que buscas?' : 'Escribe aqui que buscas...'
              }
            />
            <InputRightElement>
              <Link
                href="/explore"
                className="flex justify-center items-center hover:bg-[#1EADFF] w-full h-full rounded-r-sm md:lg:rounded-r-md lg:rounded-r-md"
              >
                <SearchIcon className="text-black/90 mb-0.5 dark:text-white/90 text-slate-500 pointer-events-none flex-shrink-0" />
              </Link>
            </InputRightElement>
          </InputGroup>
        </Box>
        {/* buttons */}
        {isAuthenticated !== undefined ? (
          <Box w={{ base: '', md: '100px', lg: '192.44px' }}>
            {!isMobile ? (
              <div className="flex gap-5 items-center justify-end">
                {isAuthenticated ? (
                  <Link href="/cart">
                    <Tooltip label="Carrito">
                      <Box className="flex items-center gap-1 bg-yellow-500 p-2 rounded-full">
                        <FaShoppingCart></FaShoppingCart>
                      </Box>
                    </Tooltip>
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
                {isAuthenticated ? (
                  <Box>
                    <PerfilAccordion
                      sessionData={sessionData}
                      isMobile={isMobile}
                    ></PerfilAccordion>
                  </Box>
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
            ) : null}
          </Box>
        ) : (
          <Box
            w={{ base: '', md: '100px', lg: '192.44px' }}
            display="flex"
            justifyContent="center"
          >
            <Spinner></Spinner>
          </Box>
        )}
      </nav>
      {isMobile ? (
        <MyAccordionContent sessionData={sessionData} token={isAuthenticated} />
      ) : null}
    </article>
  )
}
