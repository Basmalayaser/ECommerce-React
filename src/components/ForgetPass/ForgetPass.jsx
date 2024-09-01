import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {Input ,Card, CardBody, Snippet,Spinner} from "@nextui-org/react";
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ForgetPass() {

  const [userError,setUserError]=useState(null)
  const [IsLoading,setIsLoading]=useState(false)

  let navigate =useNavigate()

  const formik = useFormik({
    initialValues: {
      email:"",
    },

    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
    }),
    onSubmit: (values) => {
      forgetPassword(values.email)
    },})

   async function forgetPassword(email){
    setIsLoading(true)

    return await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,{
      email
    }).then( (data)=>{
      setIsLoading(false)
      navigate("/verifyResetCode")
     }).catch((error)=>{
      setIsLoading(false)
      setUserError("Request failed ")
     })
   }





  return (
    <>
         <div className={` flex justify-center items-center h-screen bg_Image`}>
     <Card  className='px-10 py-5 min-w-[30%] mt-10'>
     <CardBody>

     <form onSubmit={formik.handleSubmit}>
        <div className="text-center">
        <p className='text-2xl font-bold  f_roboto text-orange-500 p-5'>Forget your password ? </p>
        <p className='text-gray-500 pb-5'>Enter your email below to recive your password</p>
        </div>
       <div className="text-center">
       
       <div className="mb-4">
        <Input name='email' id='email' type="email" label="Email" radius="full" className='h-11  mx-auto' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur}/>
        {formik.touched.email && formik.errors.email ? (
         <div className='text-red-500'>{formik.errors.email}</div>
       ) : null}
        </div>
        {userError?<div className="text-red-500">{userError}</div> :null}

        <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='px-14 py-3 bg-orange-500 text-white rounded-full f_roboto  w-full'>
        {IsLoading?<Spinner  color="praimery"/>:"Submit"}</button>
       </div>

     
      </form>

      </CardBody>
      </Card>
      </div>
    </>
  )
}
