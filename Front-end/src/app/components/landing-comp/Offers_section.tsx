import { titleSize } from "@/app/chakraStyles/styles";
import { Divider, Text } from "@chakra-ui/react";
import React from "react";
import Offers_Carrusel from "./Offers_carrusel";

export default function Offers_section() {
  return (
    <main className="mt-20">
      <Divider />
      <Text m={5} fontSize={titleSize}>
        Nuestras Ofertas
      </Text>
      <Offers_Carrusel></Offers_Carrusel>
    </main>
  );
}
