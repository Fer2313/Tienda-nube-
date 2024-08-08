import { subtitleSize, text } from '@/app/chakraStyles/styles'
import { Box, Text } from '@chakra-ui/react'
import facebook from "../../../../public/Facebook.png";
import instagram from "../../../../public/Instagram.png";
import React from 'react'
import Image from 'next/image';

export default function Footer() {
  return (
    <Box className='flex flex-col mt-20 text-center py-5 bg-[#282828]'>
      <Text as={"h2"} fontSize={subtitleSize}>Seguinos en:</Text>
      <Box className='flex justify-center'>
        <Image src={facebook} alt="facebook" width={30}></Image>
        <Image src={instagram} alt="instagram" width={30}></Image>
      </Box>
      <Text as={"h2"} fontSize={subtitleSize}>Local comercial:</Text>
      <Text as={"text"} fontSize={text}>9 de Julio 1021</Text>
    </Box>
  )
}
