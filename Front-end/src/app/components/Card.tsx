import {
  Button,
  Card,
  ButtonGroup,
  CardBody,
  CardFooter,
  Container,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { subtitleSize, text } from "../chakraStyles/styles";


export default function ProductCard() {
  return (
    <Card size="sm" maxW="sm">
      <CardBody>
        <Box display={"flex"} bg={"grey"} justifyContent={"center"}>
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFtIiwbQLKvRRQn_06612_CSC84SsKQTbvoQ&s"
            alt="Green double couch with wooden legs"
            borderRadius="lg"
            w={200}
          />
        </Box>
        <Stack mt="3" spacing="2">
          <Heading fontSize={subtitleSize}>Product</Heading>
          <Text fontSize={text}>
            This sofa is perfect for modern tropical spaces, baroque inspired
            spaces, earthy toned spaces and for people who love a chic design
            with a sprinkle of vintage design.
          </Text>
          <Text color="blue.600" fontSize="2xl">
            $450
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="blue">
            Buy now
          </Button>
          <Button variant="ghost" colorScheme="blue">
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
