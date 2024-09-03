"use client";
import { useKeenSlider } from "keen-slider/react";
import React, { useEffect, useState } from "react";
import "keen-slider/keen-slider.min.css";
import Card from "../Card";

export default function Products_Carrusel({products}:any) {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Puedes ajustar el umbral de tamaño
      setIsTablet(window.innerWidth <= 1024 && window.innerWidth >= 768);
    };

    // Ejecutar al cargar el componente
    handleResize();

    // Añadir el listener para el redimensionamiento
    window.addEventListener("resize", handleResize);

    // Limpiar el listener al desmontar el componente
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function responsiveCarrusel() {
    if (isMobile) {
      return 1;
    } else if (isTablet) {
      return 2;
    } else {
      return 3;
    }
  }
  const [sliderRef] = useKeenSlider({
    loop: false,
    mode: "free",
    slides: {
      perView: responsiveCarrusel(),
      spacing: 15,
    },
  });
  return (
    <main>
      {products.length?<div ref={sliderRef} className="keen-slider">
        {products.map((product: any, index: number) => (
          <div key={index} className="keen-slider__slide">
            <Card product={product}></Card>
          </div>
        ))}
      </div>: null}
    </main>
  );
}
