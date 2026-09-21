import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { Outlet } from 'react-router-dom'
export default function Layout() {
  return (
    <>
      <Navbar />
      <div className='w-full h-max my-[12vh]'>
        <Outlet />
      </div>
      <Footer />

    </>
  )
}
