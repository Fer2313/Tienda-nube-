import { subtitleSize } from '@/chakraStyles/styles'
import filtersProducts from '@/services/filtersProducts'
import useStoreProduct from '@/store/product'
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Select,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { FocusableElement } from '@chakra-ui/utils'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react'
import { IoFilter } from 'react-icons/io5'

export interface Filters {
  order: string | undefined
  category: string | undefined
  max: number | undefined
  min: number | undefined
}

export default function Filters() {
  const { filters, setFilters, setProducts } = useStoreProduct()
  const [filtersState, setFiltersState] = useState<Filters>({
    order: filters.price,
    max: filters.priceMax,
    min: filters.priceMin,
    category: filters.category,
  })

  async function handleSave() {
    const newFilters = filters
    newFilters.category = filtersState.category
    newFilters.price = filtersState.order
    newFilters.priceMax = filtersState.max
    newFilters.priceMin = filtersState.min
    setFilters(newFilters)
    const newProducts = await filtersProducts(newFilters)
    setProducts(newProducts)
    onClose()
  }

  const updateFilters = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | string,
  ) => {
    if (typeof e === 'string') {
      setFiltersState((prevState) => ({
        ...prevState,
        category: e,
      }))
    } else {
      const { value, name } = e.target
      setFiltersState((prevState) => ({
        ...prevState,
        [name]: value,
      }))
    }
  }

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef<FocusableElement | null>(null)
  return (
    <Box display={'flex'} justifyContent="flex-end" alignItems={'flex-end'}>
      <Button
        size={'md'}
        onClick={onOpen}
        colorScheme="blue"
        rightIcon={<IoFilter />}
      >
        Filtros
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bgColor={'#2C2C2C'}>
          <DrawerCloseButton />
          <DrawerHeader>Filtrar Productos</DrawerHeader>
          <DrawerBody display={'flex'} flexDirection={'column'} gap={5}>
            <span className="flex flex-col gap-2">
              <Text fontSize={subtitleSize} textColor={'blue.200'}>
                Por precios
              </Text>
              <span className="flex flex-col text gap-1">
                <Text>Ordenar por precio</Text>
                <Select
                  onChange={updateFilters}
                  textColor={'#475569'}
                  name="order"
                  bgColor={'white'}
                  borderColor={'blue.500'}
                  iconColor="blue.500"
                >
                  <option value="default">Sin preferencia</option>
                  <option value="menor-mayor">Menor precio</option>
                  <option value="mayor-menor">Mayor precio</option>
                </Select>
              </span>
              <span className="flex flex-col gap-1">
                <Text>Rango de precio</Text>
                <div className="flex items-center gap-1 text-slate-600">
                  <Input
                    bgColor={'white'}
                    borderColor={'blue.500'}
                    placeholder="minimo"
                    type="text"
                    name="min"
                    value={filtersState.min}
                    onChange={updateFilters}
                  />
                  {'-'}
                  <Input
                    bgColor={'white'}
                    borderColor={'blue.500'}
                    placeholder="maximo"
                    type="text"
                    name="max"
                    value={filtersState.max}
                    onChange={updateFilters}
                  />
                </div>
              </span>
            </span>
            <Text fontSize={subtitleSize} textColor={'blue.200'}>
              Por rubros
            </Text>
            <RadioGroup
              onChange={updateFilters}
              name="category"
              value={filtersState.category}
            >
              <HStack
                alignItems={'start'}
                spacing="24px"
                display={'flex'}
                flexDirection={'column'}
              >
                <Radio value="Camping">Camping</Radio>
                <Radio value="Hogar">Hogar</Radio>
                <Radio value="Iluminacion">Iluminacion</Radio>
              </HStack>
            </RadioGroup>
          </DrawerBody>
          <DrawerFooter>
            <Button bgColor={'white'} color={'black'} mr={3} onClick={onClose}>
              Salir
            </Button>
            <Button onClick={handleSave} colorScheme="blue">
              Guardar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}
