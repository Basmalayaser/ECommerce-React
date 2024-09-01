import React from 'react'
import style from './Products.module.css'
import GetProducts from '../GetProducts/GetProducts'
import { Helmet } from 'react-helmet'

export default function Products() {
  return (
    <>
     <GetProducts/>

     <Helmet>
                <meta charSet="utf-8" />
                <title>All Products</title>
            </Helmet>
    </>
  )
}
