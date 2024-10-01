'use client'
import React from 'react'
import { useEffect } from 'react'
import protegedRute from '../../services/protegedRute'
import NavBar from '@/components/navBar/NavBar'
import Footer from '@/components/footer/Footer'

export default function Page() {
  useEffect(() => {
    // Define una función asíncrona dentro de useEffect
    const fetchProtectedData = async () => {
      const message = await protegedRute() // Llama a la función asíncrona
      console.log(message) // Imprime el mensaje cuando se resuelva la promesa
    }
    // Llama a la función asíncrona
    fetchProtectedData()
  }, [])
  return (
    <main>
      <NavBar></NavBar>
      page
      <Footer></Footer>
    </main>
  )
}
