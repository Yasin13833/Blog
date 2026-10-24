import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { Outlet } from 'react-router-dom'
import ScrollToTop from '../Components/ScrollTop'
export default function Layout() {
  return (
    <>
      <Navbar />
      <div className='w-full h-max'>
        <ScrollToTop/>
        <Outlet />
      </div>
      <Footer />

    </>
  )
}
