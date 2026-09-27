import React from 'react'
import Slider from '../../Components/Slider'
import Products from './Products'
import AboutProduct from './AboutProduct'
import ContactInfo from './ContactInfo'


export default function Home() {
  return (
    <>
      <Slider />
      <Products/>
      <AboutProduct/>
      <ContactInfo/>
    </>
  )
}
