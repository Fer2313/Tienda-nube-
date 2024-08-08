"use client";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/react";
import { IoCloseOutline, IoReorderThreeOutline } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import { Button } from "../Button";
import Link from "next/link";

export function MyAccordionContent() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  return (
    <Accordion borderColor={"#282828"} bgColor={"#282828"} allowToggle>
      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton display={"flex"} justifyContent={"center"}>
                {isExpanded ? (
                  <IoCloseOutline color="white" size={30} />
                ) : (
                  <IoReorderThreeOutline color="white" size={30} />
                )}
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <div className="flex gap-2 justify-center">
                <Link href="/login">
                  <Button
                    text="Ingresar"
                    background="blue"
                    hover="blue"
                    fontsize="sm"
                    color="white" onClick={undefined}></Button>
                </Link>
                <Link href="/register">
                  <Button
                    text="Registrarse"
                    background="white"
                    fontsize="sm"
                    hover="slate"
                    color="blue"
                    border="blue" onClick={undefined}></Button>
                </Link>
              </div>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
}
