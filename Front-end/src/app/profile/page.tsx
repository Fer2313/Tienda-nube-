'use client'
import React, { useEffect } from 'react'
import InfoGeneral from '../../components/profile-comp/components/Pages/infoGeneral/InfoGeneral'
import Nav from '../../components/profile-comp/components/PerfilNav/Nav'
import { useState } from 'react'
import Security from '../../components/profile-comp/components/Pages/Security/Security'
import Orders from '@/components/profile-comp/components/Pages/Orders/Orders'
import NavBar from '@/components/navBar/NavBar'
import Footer from '@/components/footer/Footer'
import Favorites from '@/components/profile-comp/components/Pages/Favorites/Favorites'
import { useRouter } from 'next/navigation'
import useAuthStore from '@/store/auth'
import { Box, Spinner } from '@chakra-ui/react'

export default function Profile() {
  const router = useRouter()
  const { sessionData } = useAuthStore()
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  const [pages, setPages] = useState({
    General: true,
    Security: false,
    Orders: false,
    Favorites: false,
  })
  return (
    <main>
      <NavBar></NavBar>
      {isAuthenticated === true && sessionData ? (
        <div className="flex justify-center items-center">
          <div className="flex flex-col md:flex-row justify-center max-w-7xl w-screen m-0 sm::m-5 md:m-5 lg:m-5">
            <section>
              <Nav
                setPages={setPages}
                pages={pages}
                sessionData={sessionData}
              />
            </section>
            <span className="w-full pt-10 flex justify-start items-start">
              {pages.General ? <InfoGeneral id={sessionData?.userId} /> : null}
              {pages.Security ? <Security /> : null}
              {pages.Orders ? <Orders /> : null}
              {pages.Favorites ? <Favorites /> : null}
            </span>
          </div>
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
