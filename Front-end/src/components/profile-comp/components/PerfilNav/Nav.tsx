'use client'
import { BsPersonFill } from 'react-icons/bs'
import { GiPadlock } from 'react-icons/gi'
import { BsBagCheckFill } from 'react-icons/bs'
import { IoMdHeart } from 'react-icons/io'
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Text,
} from '@chakra-ui/react'
import { sessionData as sessionDataInterfaz } from '@/interfaces/interfaces'
import { IoCloseOutline, IoReorderThreeOutline } from 'react-icons/io5'
import { useEffect, useState } from 'react'
const Nav = (Props: {
  setPages: (arg0: {
    General: boolean
    Security: boolean
    Orders: boolean
    Favorites: boolean
  }) => void
  pages: {
    General: boolean
    Security: boolean
    Orders: boolean
    Favorites: boolean
  }
  sessionData: sessionDataInterfaz | undefined
}) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 416) // Puedes ajustar el umbral de tamaño
    }

    // Ejecutar al cargar el componente
    handleResize()

    // Añadir el listener para el redimensionamiento
    window.addEventListener('resize', handleResize)

    // Limpiar el listener al desmontar el componente
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="flex-col md:flex p-3 sm:p-7 md:p-7 lg:p-7 rounded-none md:rounded-md lg:rounded-md bg-slate-800 justify-center sm:justify-start items-center sm:items-start">
      <Box display={'flex'} flexDir={'column'} alignItems={'center'} gap={2}>
        <Box>
          {Props.sessionData ? (
            <Avatar size={'lg'} m={1} src={Props.sessionData?.image} />
          ) : null}
        </Box>
        <span>
          <Text fontSize={'18px'}>
            {Props.sessionData?.name} {Props.sessionData?.lastName}
          </Text>
          <Text fontSize={'18px'}>Cliente: {Props.sessionData?.userId}</Text>
        </span>
      </Box>
      {!isMobile ? (
        <Box className="flex flex-wrap md:flex-col bg-slate-800 justify-center items-stretch">
          <button
            onClick={() =>
              Props.setPages({
                General: true,
                Security: false,
                Orders: false,
                Favorites: false,
              })
            }
            className={
              Props.pages.General
                ? 'flex pb-5 w-40 pt-5 items-center text-cyan-400 font-semibold pr-7 border-b border-white'
                : 'flex pb-5 w-40 pt-5 items-center text-white font-semibold pr-7 border-b border-white'
            }
          >
            <BsPersonFill className="mr-2 ml-2" />
            General
          </button>
          <button
            onClick={() =>
              Props.setPages({
                General: false,
                Security: false,
                Orders: true,
                Favorites: false,
              })
            }
            className={
              Props.pages.Orders
                ? 'flex pb-5 w-40 pt-5 items-center text-cyan-400 font-semibold pr-7 border-b border-white'
                : 'flex pb-5 w-40 pt-5 items-center text-white font-semibold pr-7 border-b border-white'
            }
          >
            <BsBagCheckFill className="mr-2 ml-2" />
            Compras
          </button>{' '}
          <button
            onClick={() =>
              Props.setPages({
                Security: true,
                General: false,
                Orders: false,
                Favorites: false,
              })
            }
            className={
              Props.pages.Security
                ? 'flex pb-5 w-40 pt-5 items-center text-cyan-400 font-semibold pr-7 border-b border-white'
                : 'flex pb-5 w-40 pt-5 items-center text-white font-semibold pr-7 border-b border-white'
            }
          >
            <GiPadlock className="mr-2 ml-2" />
            Seguridad
          </button>
          <button
            onClick={() =>
              Props.setPages({
                Security: false,
                General: false,
                Orders: false,
                Favorites: true,
              })
            }
            className={
              Props.pages.Favorites
                ? 'flex pb-5 w-40 pt-5 items-center text-cyan-400 font-semibold pr-7 border-b border-white'
                : 'flex pb-5 w-40 pt-5 items-center text-white font-semibold pr-7 border-b border-white'
            }
          >
            <IoMdHeart className="mr-2 ml-2" />
            Guardados
          </button>
        </Box>
      ) : null}
      {isMobile ? (
        <Accordion
          borderColor={'#1e293b'}
          w={'100%'}
          bgColor={'#1e293b'}
          allowToggle
        >
          <AccordionItem>
            {({ isExpanded }) => (
              <>
                <AccordionPanel p={0}>
                  <Box className="flex flex-wrap md:flex-col bg-slate-800 justify-center items-stretch">
                    <button
                      onClick={() =>
                        Props.setPages({
                          General: true,
                          Security: false,
                          Orders: false,
                          Favorites: false,
                        })
                      }
                      className={
                        Props.pages.General
                          ? 'flex pb-5 w-40 pt-5 items-center text-cyan-400 font-semibold pr-7 border-b border-white'
                          : 'flex pb-5 w-40 pt-5 items-center text-white font-semibold pr-7 border-b border-white'
                      }
                    >
                      <BsPersonFill className="mr-2 ml-2" />
                      General
                    </button>
                    <button
                      onClick={() =>
                        Props.setPages({
                          General: false,
                          Security: false,
                          Orders: true,
                          Favorites: false,
                        })
                      }
                      className={
                        Props.pages.Orders
                          ? 'flex pb-5 w-40 pt-5 items-center text-cyan-400 font-semibold pr-7 border-b border-white'
                          : 'flex pb-5 w-40 pt-5 items-center text-white font-semibold pr-7 border-b border-white'
                      }
                    >
                      <BsBagCheckFill className="mr-2 ml-2" />
                      Compras
                    </button>{' '}
                    <button
                      onClick={() =>
                        Props.setPages({
                          Security: true,
                          General: false,
                          Orders: false,
                          Favorites: false,
                        })
                      }
                      className={
                        Props.pages.Security
                          ? 'flex pb-5 w-40 pt-5 items-center text-cyan-400 font-semibold pr-7 border-b border-white'
                          : 'flex pb-5 w-40 pt-5 items-center text-white font-semibold pr-7 border-b border-white'
                      }
                    >
                      <GiPadlock className="mr-2 ml-2" />
                      Seguridad
                    </button>
                    <button
                      onClick={() =>
                        Props.setPages({
                          Security: false,
                          General: false,
                          Orders: false,
                          Favorites: true,
                        })
                      }
                      className={
                        Props.pages.Favorites
                          ? 'flex pb-5 w-40 pt-5 items-center text-cyan-400 font-semibold pr-7 border-b border-white'
                          : 'flex pb-5 w-40 pt-5 items-center text-white font-semibold pr-7 border-b border-white'
                      }
                    >
                      <IoMdHeart className="mr-2 ml-2" />
                      Guardados
                    </button>
                  </Box>
                </AccordionPanel>
                <AccordionButton display={'flex'} justifyContent={'center'}>
                  {isExpanded ? (
                    <IoCloseOutline color="white" size={30} />
                  ) : (
                    <IoReorderThreeOutline color="white" size={30} />
                  )}
                </AccordionButton>
              </>
            )}
          </AccordionItem>
        </Accordion>
      ) : null}
    </div>
  )
}

export default Nav
