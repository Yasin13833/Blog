
import React from 'react'

import { useSelector } from 'react-redux'

import { Navbar, SideBar } from '../Components'

import { Navigate, Outlet} from 'react-router-dom'

export default function Layout() {
  const { token} = useSelector(state => state.auth)
  if(!token){
    return <Navigate to={'/auth'} replace/>
  }
  return (
    <div className="min-h-screen w-full bg-[#050806]">

      {/* Navbar */}
      <Navbar />

      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <main className="min-h-screen pt-25 pl-56">

        <Outlet />

      </main>

    </div>
  )
}

