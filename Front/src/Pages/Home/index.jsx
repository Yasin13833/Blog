import React from 'react'
import Slider from '../../Components/HeroSection'
import Products from './Products'
import ContactInfo from './ContactInfo'
import Category from './Category'


export default function Home() {
  return (
    <>
      <Slider />
      <Products/>
      <Category/>
      <ContactInfo/>
    </>
  )
}
