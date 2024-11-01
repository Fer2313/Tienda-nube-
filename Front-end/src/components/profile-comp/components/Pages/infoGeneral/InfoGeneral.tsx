import React from 'react'
import UserInfo from './infoForm'

export default function InfoGeneral({ id }: { id: number | undefined }) {
  return (
    <div className="ml-0 sm:ml-10 w-full max-w-6xl">
      <div className="ml-1 sm:ml-0">
        <h1>INFORMACION GENERAL</h1>
        <div className="border-b-2 border-cyan-400 mt-5 w-24"></div>
      </div>
      <section className="mt-2 ">
        <UserInfo id={id}></UserInfo>
      </section>
    </div>
  )
}
