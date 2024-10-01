'use client'
import { Image } from '@chakra-ui/react'
import Arrow from './Arrow'
import { useKeenSlider } from 'keen-slider/react'
import React, { useState } from 'react'
import 'keen-slider/keen-slider.min.css'
import './ProductImg.css'
import { Image as IntImage } from '@/interfaces/interfaces'

export default function Images_Products({
  images,
  w,
  h,
}: {
  images: IntImage[]
  w: number | string
  h: number | string
}) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })
  return (
    <>
      <div className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider">
          {images.length
            ? images.map((image: IntImage, index: number) => (
                <div key={index} className="keen-slider__slide number-slide1">
                  <Image
                    h={h}
                    src={image.imageUrl}
                    alt="Images"
                    width={w}
                    maxW={{
                      base: '200px',
                      sm: '400px',
                      md: '100%',
                      lg: '100%',
                    }}
                    maxH={{
                      base: '200px',
                      sm: '400px',
                      md: '100%',
                      lg: '100%',
                    }}
                  ></Image>
                </div>
              ))
            : null}
        </div>
        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation()
                instanceRef.current?.prev()
              }}
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation()
                instanceRef.current?.next()
              }}
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </div>
    </>
  )
}
