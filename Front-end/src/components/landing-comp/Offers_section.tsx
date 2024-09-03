import { titleSize } from "@/chakraStyles/styles";
import { Divider, Text } from "@chakra-ui/react";
import React from "react";
import Products_Carrusel from "./Products_carrusel";

export default function Offers_section({ products }:any) {
  return (
    <main className="mt-20">
      <Divider />
      <Text m={5} fontSize={titleSize}>
        Nuestras Ofertas
      </Text>
      <Products_Carrusel products={products}></Products_Carrusel>
    </main>
  );
}
