import React, { useEffect, useState } from 'react'
import style from './Checkout.module.css'
import {Input ,Card, CardBody, Snippet} from "@nextui-org/react";
import { Link, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { TokenContext } from '../../Context/TokenContext';
import { useContext } from 'react';
import { CartContext } from '../../Context/Cartcontext';

export default function Checkout() {
 const [paymentType,setpaymentType]=useState(null)
 const {onlinePayment,cashPayment}=useContext(CartContext)
 const {type}=useParams()

  useEffect(()=>{
    setpaymentType(type)
  },[])

  const formik = useFormik({
    initialValues: {
      details:"",
      phone:"",
      city:"",
    },

    // validationSchema: Yup.object({
    //   email: Yup.string().email('Invalid email address').required('Email is required'),
    //   password:Yup.string().required('Password is required').matches(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/,"Password is not valid"),
    
    // }),
    onSubmit: (values) => {
     payment(values)

    },})

    async function payment(shippingAddress){
      if(paymentType=="Online Payment"){
       let response= await onlinePayment(shippingAddress)
       console.log(response)
      }else{
        let response= await cashPayment(shippingAddress)
        console.log(response)
      }
    
    }

  return (
    <>
        <div className={` flex justify-center items-center h-screen bg_Image`}>
     <Card  className='px-10 py-5 min-w-[30%] mt-10'>
     <CardBody>

     <form onSubmit={formik.handleSubmit}>
        <div className="text-center">
        <h2 className='text-4xl font-bold text-orange-500 pb-2 f_roboto'>{type}</h2>
        <p className='text-gray-500 pb-5'>Enter your data to complete payment process</p>
        </div>
       <div className="text-center">
       {/* {userError? <Snippet color="danger" hideSymbol="false" hideCopyButton="false" className="mb-4 w-full">{userError}</Snippet>:null} */}

       <div className="mb-4">
        <Input name='details' id='details' type="text" label="Details" radius="full" className='h-11 w-4/5 mx-auto' onChange={formik.handleChange} value={formik.values.details} onBlur={formik.handleBlur}/>
        {formik.touched.details && formik.errors.details ? (
         <div className='text-red-500'>{formik.errors.details}</div>
       ) : null}
        </div>

        <div className="mb-4">
        <Input name='phone' id='phone' type="tel" label="Phone" radius="full"  className='h-11 w-4/5 mx-auto' onChange={formik.handleChange} value={formik.values.phone} onBlur={formik.handleBlur}/>
        {formik.touched.phone && formik.errors.phone ? (
         <div className='text-red-500'>{formik.errors.phone}</div>
       ) : null}
        </div>

        <div className="mb-4">
        <Input name='city' id='city' type="text" label="City" radius="full"  className='h-11 w-4/5 mx-auto' onChange={formik.handleChange} value={formik.values.city} onBlur={formik.handleBlur}/>
        {formik.touched.city && formik.errors.city ? (
         <div className='text-red-500'>{formik.errors.city}</div>
       ) : null}
        </div>

       </div>


        <div className="flex justify-center">
          <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='px-14 py-3 bg-orange-500 text-white rounded-full f_roboto '>PayNow</button>
        </div>
      </form>

      </CardBody>
      </Card>
      </div>
    </>
  )
}
