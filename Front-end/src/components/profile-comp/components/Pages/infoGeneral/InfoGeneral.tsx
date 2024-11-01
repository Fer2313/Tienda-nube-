import React from 'react'
import UserInfo from './infoForm'
import { Text } from '@chakra-ui/react'
import { subtitleSize } from '@/chakraStyles/styles'

export default function InfoGeneral({ id }: { id: number | undefined }) {
  return (
    <div className="ml-0 sm:ml-10 w-full max-w-6xl">
      <div className="ml-1 sm:ml-0">
        <Text as="h1" fontSize={subtitleSize}>
          INFORMACION GENERAL
        </Text>
        <div className="border-b-2 border-cyan-400 mt-5 w-24"></div>
      </div>
      <section>
        <UserInfo id={id}></UserInfo>
      </section>
    </div>
  )
}
