"use client";
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
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { subtitleSize } from "../chakraStyles/styles";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

export default function ProductCard({ product }: any) {
  useEffect(() => {
    console.log(product);
  }, []);
  return (
    <Card size="sm" maxW="sm">
      <CardBody>
        <Box display={"flex"} justifyContent={"center"}>
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
          <Text color="blue.600" fontSize="2xl">
            $450
          </Text>
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
  );
}
