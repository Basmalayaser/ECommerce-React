import React from 'react'
import style from './Loader.module.css'
import { Triangle } from 'react-loader-spinner'


export default function Loader() {
  return (
    <>
      <div className=" container mx-auto h-screen flex justify-center items-center" >
        <Triangle
            visible={true}
            height="80"
            width="80"
            color="#f97316"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            />
        </div>
      </>
  )
}
