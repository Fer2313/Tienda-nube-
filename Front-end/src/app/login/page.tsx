import { Box, Container } from '@chakra-ui/react'
import Image from 'next/image'
import Ico from '../../../public/Icon.jpg'
import React from 'react'
import Form from '@/components/login-comp/Form'
import NavBar from '@/components/navBar/NavBar'
import Footer from '@/components/footer/Footer'

export default function Page() {
  return (
    <main>
      <NavBar></NavBar>
      <div className="flex justify-center my-20 ">
        <Container
          bgColor={'#2C2C2C'}
          maxW={'400px'}
          border="1px solid white"
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
      <Footer></Footer>
    </main>
  )
}
