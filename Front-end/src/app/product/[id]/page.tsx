"use client";
import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navBar/NavBar";
import getProductById from "@/services/getProductById";
import { FaShoppingCart } from "react-icons/fa";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Spinner,

} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "../text.css";
import Link from "next/link";
import Recomend_carrusel from "@/components/product-comp/Recomend_carrusel";
import CardComponent from "@/components/product-comp/Card_Component";

export default function page() {
  let [product, setProduct] = useState<any>(null);

  async function getProductHandle(id: number) {
    const productReq = await getProductById(id);
    setProduct(productReq);
  }

  useEffect(() => {
    const path = window.location.pathname;
    const productId = path.split("/").pop();
    getProductHandle(Number(productId));
  }, []);

  return (
    <main>
      <NavBar></NavBar>
      {product ? (
        <main>
          <Box className="mt-5 md:mt-10 lg:mt-20 mx-5 md:mx-10 lg:mx-10">
            <Link href="/">
              <button>{"<"} Volver</button>
            </Link>
           <CardComponent product={product}></CardComponent>
          </Box>
          <section className="mx-5 md:mx-10 lg:mx-10">
            <Recomend_carrusel id={product.productId}></Recomend_carrusel>
          </section>
        </main>
      ) : (
        <Box
          display="flex"
          justifyContent={"center"}
          alignItems={"center"}
          h={"500px"}
          w={"100%"}
        >
          <Spinner size={"lg"}></Spinner>
        </Box>
      )}
      <Footer></Footer>
    </main>
  );
}
