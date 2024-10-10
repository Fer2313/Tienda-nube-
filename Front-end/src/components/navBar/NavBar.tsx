'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Ico from '../../../public/Icon.jpg'
import { SearchIcon } from './SearchIcon'
import { Button } from '../Button'
import {
  Avatar,
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
} from '@chakra-ui/react'
import { MyAccordionContent } from './myAccordionContent'
import Link from 'next/link'
import { FaShoppingCart } from 'react-icons/fa'
import useAuthStore from '@/store/auth'

export default function NavBar() {
  const [isMobile, setIsMobile] = useState(false)
  const { isAuthenticated, checkAuth } = useAuthStore()

  useEffect(() => {
    const verify = async () => {
      await checkAuth()
    }

    verify()
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
        <Box w={{ base: '', md: '100px', lg: '192.44px' }}>
          <Link href={'/'}>
            <Image
              className="rounded-full"
              src={Ico}
              alt="Icono"
              width={60}
            ></Image>
          </Link>
        </Box>
        {/* search */}
        <InputGroup
          color={'black'}
          size={{ base: 'sm', lg: 'md' }}
          maxW={{ base: '100%', md: '500px' }}
        >
          <Input
            bgColor={'white'}
            placeholder={
              isMobile ? '¿Que buscas?' : 'Escribe aqui que buscas...'
            }
          />
          <InputRightElement>
            <Link
              href="/explore"
              className="flex justify-center items-center hover:bg-[#1EADFF] w-full h-full rounded-r-md"
            >
              <SearchIcon className="text-black/90 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            </Link>
          </InputRightElement>
        </InputGroup>
        {/* buttons */}
        {isAuthenticated !== undefined ? (
          <Box w={{ base: '', md: '100px', lg: '192.44px' }}>
            {!isMobile ? (
              <div className="flex gap-5 items-center justify-end">
                {isAuthenticated ? (
                  <Link href="/cart">
                    <Box className="flex items-center gap-1 bg-yellow-500 p-2 rounded-full">
                      <FaShoppingCart></FaShoppingCart>
                    </Box>
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
                  <Link href="/profile">
                    <Avatar src="https://bit.ly/broken-link" />
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
      {isMobile ? <MyAccordionContent token={isAuthenticated} /> : null}
    </article>
  )
}
