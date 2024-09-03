import { Divider, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Products_Carrusel from "../landing-comp/Products_carrusel";
import { titleSize } from "@/chakraStyles/styles";
import { getProducts } from "@/services/getProducts";

export default function Recomend_carrusel({ id }: any) {
  let [products, setProducts] = useState<any>([]);
  async function getProductsHandler() {
    const productos = await getProducts(id);
    setProducts(productos);
  }
  useEffect(() => {
    getProductsHandler();
  }, []);

  return (
    <main className="mt-10">
      <Text my={5} fontSize={titleSize}>
        Productos recomendados
      </Text>
      <Products_Carrusel products={products}></Products_Carrusel>
    </main>
  );
}
