import { titleSize } from "@/chakraStyles/styles";
import { Box, Divider, Text } from "@chakra-ui/react";
import camping from "../../../public/camping-svgrepo-com.svg";
import hogar from "../../../public/home-svgrepo-com.svg";
import ilumination from "../../../public/light-office-room-svgrepo-com.svg";
import React from "react";
import Image from "next/image";

export default function Categories_section() {
  return (
    <main>
      <Divider />
      <Text m={5} fontSize={titleSize}>
        Categorias Destacadas
      </Text>
      <Box display={"flex"} justifyContent={"center"}>
        <Box
          w={"1000px"}
          display={"flex"}
          flexWrap={"wrap"}
          gap={{ base: "10px", md: "80px", lg: "80px" }}
          justifyContent={"center"}
        >
          <button className="flex flex-col p-2 gap-1 rounded-sm items-center hover:bg-slate-400">
            <div className="p-5 rounded-full bg-white">
              <Image src={camping} width={80} alt="camping"></Image>
            </div>
            <Text>Camping</Text>
          </button>
          <button className="flex flex-col p-2 gap-1 rounded-sm items-center hover:bg-slate-400">
            <div className="p-5 rounded-full bg-white">
              <Image src={hogar} width={80} alt="hogar"></Image>
            </div>
            <Text> Hogar</Text>
          </button>
          <button className="flex flex-col p-2 gap-1 rounded-sm items-center hover:bg-slate-400">
            <div className="p-5 rounded-full bg-white">
              <Image src={ilumination} width={80} alt="ilumination"></Image>
            </div>
            <Text>Iluminacion</Text>
          </button>
        </Box>
      </Box>
    </main>
  );
}
