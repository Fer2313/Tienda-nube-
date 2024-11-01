import {
  Avatar,
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import Link from 'next/link'
import { IoMdArrowDropup } from 'react-icons/io'
import { useState } from 'react'
import useAuthStore from '@/store/auth'
import { sessionData } from '@/interfaces/interfaces'

const PerfilAccordion = ({
  isMobile,
  sessionData,
}: {
  isMobile: boolean
  sessionData: sessionData | undefined
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const { logout } = useAuthStore()

  async function CloseSession() {
    await logout()
  }
  return (
    <Box>
      <Menu>
        {isMobile ? (
          <Tooltip label="Cuenta">
            <MenuButton w={'100%'}>
              {sessionData ? (
                <Avatar
                  cursor={'pointer'}
                  size={'sm'}
                  m={1}
                  onClick={() => setIsOpen(!isOpen)}
                  src={sessionData?.image}
                />
              ) : null}
              <Text>Cuenta</Text>
            </MenuButton>
          </Tooltip>
        ) : (
          <Tooltip label="Cuenta">
            <MenuButton>
              <Avatar
                cursor={'pointer'}
                m={1}
                size={'md'}
                onClick={() => setIsOpen(!isOpen)}
                src={
                  sessionData?.image
                    ? sessionData.image
                    : 'https://bit.ly/broken-link'
                }
              />
            </MenuButton>
          </Tooltip>
        )}
        <MenuList left={10} color={'black'}>
          <Box position={'relative'}>
            <Box
              position={'absolute'}
              top={-6}
              display={'flex'}
              justifyContent={'end'}
              w={'100%'}
            >
              <IoMdArrowDropup color="white" size={27}></IoMdArrowDropup>
            </Box>
          </Box>
          <Box display={'flex'} gap={2} justifyContent={'center'} p={2}>
            <Text>{sessionData?.name}</Text>
            <Text>{sessionData?.lastName}</Text>
          </Box>
          <Link href="/profile">
            <MenuItem>Perfil</MenuItem>
          </Link>
          <MenuItem onClick={CloseSession} color="red.400">
            Cerrar session
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  )
}

export default PerfilAccordion
