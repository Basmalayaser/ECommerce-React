import React, { useContext, useEffect } from 'react'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import GetProducts from '../GetProducts/GetProducts'
import { CartContext } from '../../Context/Cartcontext'
import { Helmet } from 'react-helmet'

export default function Home() {
  
  return (
    <>
      <MainSlider/>
      <CategorySlider/>
      <GetProducts/>

      <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
            </Helmet>
    </>
  )
}

