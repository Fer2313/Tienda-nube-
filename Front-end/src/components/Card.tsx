'use client'
import {
  Button,
  Card,
  ButtonGroup,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
  Box,
  Tag,
} from '@chakra-ui/react'
import React from 'react'
import { subtitleSize } from '../chakraStyles/styles'
import Link from 'next/link'
import { FaShoppingCart } from 'react-icons/fa'
import { Products } from '@/interfaces/interfaces'

interface Props {
  product: Products
}

export default function ProductCard({ product }: Props) {
  return (
    <Card size="sm" w={'100%'} maxW="sm">
      <CardBody>
        <Box display={'flex'} justifyContent={'center'}>
          <Image
            src={product.images[0].imageUrl}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
            w={{ base: 190, md: 200, lg: 200 }}
          />
        </Box>
        <Stack mt="3" spacing="2">
          <Heading fontSize={subtitleSize} h={12}>
            {product.productName}
          </Heading>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Text color="blue.600" fontSize="2xl">
              {product?.price ? '$' + product?.price : '$0'}
            </Text>
            <Tag
              colorScheme={'yellow'}
              size={{ base: 'sm', md: 'md', lg: 'lg' }}
            >
              {product.category}
            </Tag>
          </Box>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Link href={`/product/${product.productId}`}>
            <Button variant="solid" colorScheme="blue">
              Ver producto
            </Button>
          </Link>
          <Button display="flex" gap={1} variant="ghost" colorScheme="blue">
            <Text> Añadir </Text> <FaShoppingCart></FaShoppingCart>
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  )
}
