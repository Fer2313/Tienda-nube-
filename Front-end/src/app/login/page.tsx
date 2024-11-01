'use client'
import { Box, Container, Spinner } from '@chakra-ui/react'
import Image from 'next/image'
import Ico from '../../../public/Icon.jpg'
import React, { useEffect, useState } from 'react'
import Form from '@/components/login-comp/Form'
import NavBar from '@/components/navBar/NavBar'
import Footer from '@/components/footer/Footer'
import { useRouter } from 'next/navigation'
import useAuthStore from '@/store/auth'

function Page() {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)
  const { isAuthenticated } = useAuthStore()
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
    }
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 400) // Puedes ajustar el umbral de tamaño
    }

    // Ejecutar al cargar el componente
    handleResize()

    // Añadir el listener para el redimensionamiento
    window.addEventListener('resize', handleResize)

    // Limpiar el listener al desmontar el componente
    return () => window.removeEventListener('resize', handleResize)
  }, [isAuthenticated, router])

  return (
    <main>
      <NavBar></NavBar>
      {isAuthenticated === false ? (
        <div className="flex justify-center my-20 ">
          <Container
            bgColor={'#2C2C2C'}
            maxW={'400px'}
            borderX={isMobile ? '0px' : '1px solid white'}
            borderY={'1px solid white'}
            rounded={{ base: '', sm: 'md', md: 'md', lg: 'md' }}
            p={{ base: 5, sm: 10, md: 10, lg: 10 }}
          >
            <Box display={'flex'} mb={5} justifyContent={'center'}>
              <Image
                className="rounded-full"
                src={Ico}
                alt="icono"
                width={100}
              ></Image>
            </Box>
            <Form></Form>
          </Container>
        </div>
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
      <Footer></Footer>
    </main>
  )
}

export default Page
