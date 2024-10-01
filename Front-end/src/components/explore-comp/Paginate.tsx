'use client'
import useStoreProduct from '@/store/product'
import { Box } from '@chakra-ui/react'
import React, { useState } from 'react'
import filtersProducts from '@/services/filtersProducts'

export default function Paginate() {
  const { products, filters, setFilters, setProducts } = useStoreProduct()
  const maxPagesToShow: number = 6
  const [currentPage, setCurrentPage] = useState<number>(1)
  const pages = Math.ceil(products.productsCount / 9)

  const getPaginationItems = () => {
    const pageNumbers = []

    for (let i = 1; i <= Math.min(3, pages); i++) {
      pageNumbers.push(i)
    }

    if (pages > maxPagesToShow && currentPage > 4) {
      pageNumbers.push('...')
    }

    for (let i = Math.max(pages - 2, 4); i <= pages; i++) {
      pageNumbers.push(i)
    }

    return pageNumbers
  }
  const handleNext = async () => {
    if (currentPage !== pages) {
      const newCurrent = currentPage + 1
      setCurrentPage(newCurrent)
      const newFilters = filters
      newFilters.page = newCurrent
      setFilters(newFilters)
      const newProducts = await filtersProducts(newFilters)
      setProducts(newProducts)
    }
  }

  const handleNumber = async (number: number) => {
    const newCurrent = number
    setCurrentPage(newCurrent)
    const newFilters = filters
    newFilters.page = newCurrent
    setFilters(newFilters)
    const newProducts = await filtersProducts(newFilters)
    setProducts(newProducts)
  }

  const handlePrev = async () => {
    if (currentPage > 1) {
      const newCurrent = currentPage - 1
      setCurrentPage(newCurrent)
      const newFilters = filters
      newFilters.page = newCurrent
      setFilters(newFilters)
      const newProducts = await filtersProducts(newFilters)
      setProducts(newProducts)
    }
  }
  return (
    <Box display={'flex'} justifyContent={'center'}>
      <div className="flex space-x-2">
        {currentPage > 1 ? (
          <button
            onClick={handlePrev}
            className="rounded-full border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-white hover:text-black hover:bg-white hover:border-white focus:text-black focus:bg-white focus:border-white active:border-white active:text-[#1EADFF] active:bg-white disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Anterior
          </button>
        ) : (
          <button className="min-w-9 cursor-default rounded-full border bg-slate-300 border-black bg-opacity-5 py-2 px-3 text-center text-sm transition-all shadow-sm text-white">
            Anterior
          </button>
        )}
        {getPaginationItems().map((item: string | number, index: number) => (
          <button
            onClick={() => typeof item === 'number' && handleNumber(item)}
            key={index}
            className={`min-w-9 py-2 px-3 ${item === currentPage ? 'bg-[#1EADFF]' : 'bg-black'} border-white hover:border-[#1EADFF] active:border-[#1EADFF] focus:border-[white] border-b border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-[#1EADFF] focus:shadow-none active:bg-[#1EADFF] hover:bg-[#1EADFF] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2`}
            disabled={typeof item !== 'number'}
          >
            {item}
          </button>
        ))}
        {currentPage !== pages ? (
          <button
            onClick={handleNext}
            className="min-w-9 rounded-full border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-white hover:text-black hover:bg-white hover:border-white focus:text-black focus:bg-white focus:border-white active:border-white active:text-[#1EADFF] active:bg-white disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Siguiente
          </button>
        ) : (
          <button className="min-w-9 cursor-default rounded-full border bg-slate-300 border-black bg-opacity-5 py-2 px-3 text-center text-sm transition-all shadow-sm text-white">
            Siguiente
          </button>
        )}
      </div>
    </Box>
  )
}
