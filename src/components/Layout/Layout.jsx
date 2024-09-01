import React, { useContext, useEffect } from 'react'
import style from './Layout.module.css'
import Navbarrr from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'



export default function Layout() {


  return (
    <>
      <Navbarrr/>
      <Outlet/>
    </>
  )
}
