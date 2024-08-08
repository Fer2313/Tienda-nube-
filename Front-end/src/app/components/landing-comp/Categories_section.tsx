
import { titleSize } from "@/app/chakraStyles/styles";
import { Box, Divider, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";

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
          gap={{base:"10px",md:"80px",lg:"80px"}}
          justifyContent={"center"}
        >
          <div className="p-16 rounded-full bg-slate-200"></div>
          <div className="p-16 rounded-full bg-slate-200"></div>
          <div className="p-16 rounded-full bg-slate-200"></div>
          <div className="p-16 rounded-full bg-slate-200"></div>
          <div className="p-16 rounded-full bg-slate-200"></div>
        </Box>
      </Box>
    </main>
  );
}
