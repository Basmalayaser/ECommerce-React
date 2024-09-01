
import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {Input ,Card, CardBody, Snippet,Spinner} from "@nextui-org/react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function ResetPass(){

  const [userError,setUserError]=useState(null)
  const [IsLoading,setIsLoading]=useState(false)


  let navigate=useNavigate()

  const formik = useFormik({
    initialValues: {
      newPassword:"",
      email:"",
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      newPassword:Yup.string().required('Password is required').matches(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/,"Password is not valid"),
    
    }),
    onSubmit: (values) => {
      console.log(values)
      resetNewPassword(values.email,values.newPassword)
    },})

   async function resetNewPassword(email,newPassword){
    setIsLoading(true)
    return await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,{
      email,
      newPassword
    }).then( (data)=>{
      setIsLoading(false)
      navigate("/login")
        console.log(data)
     }).catch((error)=>{
      setIsLoading(false)
      setUserError("invalid Email or Password")
      console.log(console.error)
     })
   }

  return (
    <>
         <div className={` flex justify-center items-center h-screen bg_Image`}>
     <Card  className='px-10 py-5 min-w-[30%] mt-10'>
     <CardBody>

     <form onSubmit={formik.handleSubmit}>
     <div className="text-center">
        </div>
       <div className="text-center">

       <div className="mb-4">
        <Input name='email' id='email'  type="email" label="email" radius="full" className='h-11 w-3/4 mx-auto' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur}/>
        {formik.touched.email && formik.errors.email ? (
         <div className='text-red-500'>{formik.errors.email}</div>
       ) : null}
        </div>

        <div className="mb-4">
        <Input name='newPassword' id='newPassword'  type="password" label="new Password" radius="full" className='h-11 w-3/4 mx-auto' onChange={formik.handleChange} value={formik.values.newPassword} onBlur={formik.handleBlur}/>
        {formik.touched.newPassword && formik.errors.newPassword ? (
         <div className='text-red-500'>{formik.errors.newPassword}</div>
       ) : null}
        </div>

        {userError?<div className="">{userError} <Link to='/forgetPass' className='text-orange-500 underline underline-offset-2'>Try again</Link></div>:null}
        <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='px-14 py-3 bg-orange-500 text-white rounded-full f_roboto w-3/4'>
        {IsLoading?<Spinner  color="praimery"/>:"Submit"}</button>
       </div>

     
      </form>

      </CardBody>
      </Card>
      </div>
    </>
  )
}

