import React from 'react'
import { useSelector } from 'react-redux'
import { Navbar, SideBar } from '../Components'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  const { token, user } = useSelector(state => state.auth)
  // console.log(token, user)
  return (
    <div className='w-full h-screen'>
      <Navbar />
      <Outlet />
      <SideBar />
    </div>
  )
}

{/* <div className='bg-black/70 backdrop-blur-lg  absolute right-5 top-1/2 -translate-y-1/2 w-50 h-5/12 rounded-2xl'>
  <ul className='z-10 w-full h-full flex flex-col items-center justify-around'>
    <li className='text-white cursor-pointer'>Create</li>
    <li className='text-white cursor-pointer'>Update</li>
    <li className='text-white cursor-pointer'>Remove</li>
  </ul>
</div> */}
