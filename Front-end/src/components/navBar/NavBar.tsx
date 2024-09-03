"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Ico from "../../../public/Icon.jpg";
import perfil from "../../../public/Generic avatar.png";
import carrito from "../../../public/Icon Button.png";
import { SearchIcon } from "./SearchIcon";
import { Button } from "../Button";
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Skeleton,
  Spinner,
} from "@chakra-ui/react";
import { MyAccordionContent } from "./myAccordionContent";
import Link from "next/link";
import { verifySession } from "@/services/verifySession";

export default function NavBar() {
  const [isMobile, setIsMobile] = useState(false);

  const [token, setIsAuthenticated] = useState<any>("None");
  const fetchVerifySession = async () => {
    const verify = await verifySession();
    setIsAuthenticated(verify);
  };
  useEffect(() => {
    fetchVerifySession();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Puedes ajustar el umbral de tamaño
    };

    // Ejecutar al cargar el componente
    handleResize();

    // Añadir el listener para el redimensionamiento
    window.addEventListener("resize", handleResize);

    // Limpiar el listener al desmontar el componente
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <article>
      <nav className="flex bg-[#282828] px-5 py-3 gap-2 items-center justify-between">
        {/* icon */}
        <Box w={{ base: "", md: "100px", lg: "192.44px" }}>
          <Link href={"/"}>
            <Image className="rounded-full" src={Ico} alt="Icono"  width={60}></Image>
          </Link>
        </Box>
        {/* search */}
        <InputGroup
          color={"black"}
          size={{ base: "sm", lg: "md" }}
          maxW={{ base: "100%", md: "600px" }}
        >
          <Input
            bgColor={"white"}
            placeholder={
              isMobile ? "¿Que buscas?" : "Escribe aqui que buscas..."
            }
          />
          <InputRightElement>
            {
              <button className="flex justify-center items-center hover:bg-[#1EADFF] w-full h-full rounded-r-md">
                <SearchIcon className="text-black/90 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
              </button>
            }
          </InputRightElement>
        </InputGroup>
        {/* buttons */}
        {token !== "None" ? (
          <Box w={{ base: "", md: "100px", lg: "192.44px" }}>
            {!isMobile ? (
              <div className="flex gap-2 items-center justify-end">
                {token ? (
                  <Link href="/cart">
                    <Image src={carrito} alt="carrito" width={32}></Image>
                  </Link>
                ) : (
                  <Link href="/login">
                    <Button
                      text="Ingresar"
                      background="blue"
                      hover="blue"
                      fontsize="sm"
                      color="white"
                      onClick={undefined}
                    ></Button>
                  </Link>
                )}
                {token ? (
                  <Link href="/profile">
                    <Image src={perfil} alt="perfil" width={50}></Image>
                  </Link>
                ) : (
                  <Link href="/register">
                    <Button
                      text="Registrarse"
                      background="white"
                      fontsize="sm"
                      hover="slate"
                      color="blue"
                      border="blue"
                      onClick={undefined}
                    ></Button>
                  </Link>
                )}
              </div>
            ) : null}
          </Box>
        ) : (
          <Box
            w={{ base: "", md: "100px", lg: "192.44px" }}
            display="flex"
            justifyContent="center"
          >
            <Spinner></Spinner>
          </Box>
        )}
      </nav>
      {isMobile ? <MyAccordionContent token={token}/> : null}
    </article>
  );
}
