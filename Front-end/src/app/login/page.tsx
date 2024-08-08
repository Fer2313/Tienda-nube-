import { Box, Container } from "@chakra-ui/react";
import Image from "next/image";
import Ico from "../../../public/Group 26.png";
import React from "react";
import Form from "../components/login-comp/Form";

export default function page() {

  return (
    <main className="flex justify-center my-20 ">
      <Container
        bgColor={"#2C2C2C"}
        maxW={"400px"}
        border="1px solid white"
        rounded={{base:"",sm:"md",md:"md",lg:"md"}}
        p={{base:5,sm:10,md:10,lg:10}}
      >
        <Box display={"flex"} mb={5} justifyContent={"center"}>
          <Image src={Ico} alt="icono" width={100}></Image>
        </Box>
        <Form></Form>
      </Container>
    </main>
  );
}
