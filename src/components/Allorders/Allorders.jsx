import React, { useContext, useEffect } from 'react'
import style from './Allorders.module.css'
import { CartContext } from '../../Context/Cartcontext'
import { flushSync } from 'react-dom'
import { Navigate } from 'react-router-dom'

export default function Allorders() {

  const {getAllOrder}=useContext(CartContext)

   async function allcart(){
     await getAllOrder()
  }

  useEffect(()=>{
    allcart()
  })
  return (
    <>
      <Navigate to="/"></Navigate>
    </>
  )
}
