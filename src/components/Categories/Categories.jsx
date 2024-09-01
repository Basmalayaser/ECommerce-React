import React from 'react'
import style from './Categories.module.css'
import CategorySlider from '../CategorySlider/CategorySlider'
import { Helmet } from 'react-helmet'

export default function Categories() {
  return (
    <>
     <div className="pt-14"></div>
     <CategorySlider/>

     <Helmet>
                <meta charSet="utf-8" />
                <title>Categories</title>
            </Helmet>
    </>
  )
}
