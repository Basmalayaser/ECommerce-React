import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {Input ,Card, CardBody, Snippet,Spinner} from "@nextui-org/react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function VerifyResetCode() {

  const [userError,setUserError]=useState(null)
  const [IsLoading,setIsLoading]=useState(false)


  let navigate=useNavigate()

  const formik = useFormik({
    initialValues: {
      resetCode:"",
    },

    onSubmit: (values) => {
      console.log(values.resetCode)
      VerifyCode(values.resetCode)
    },})
   async function VerifyCode(resetCode){
    setIsLoading(true)
    return await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,{
      resetCode:resetCode
    }).then( (data)=>{
      setIsLoading(false)
      navigate("/resetPass")
        console.log(data)
     }).catch((error)=>{
      setIsLoading(false)
      setUserError("invalid code")
     })
   }

  return (
    <>
         <div className={` flex justify-center items-center h-screen bg_Image`}>
     <Card  className='px-10 py-5 min-w-[30%] mt-10'>
     <CardBody>

     <form onSubmit={formik.handleSubmit}>
     <div className="text-center">
        <h2 className='text-4xl font-bold text-orange-500 pb-2 f_roboto'>Verify your email</h2>
        <p className='text-gray-500 pb-5'>Please write the number we have send to your email</p>
        </div>
       <div className="text-center">

       <div className="mb-4">
        <Input name='resetCode' id='resetCode' inputmode="numeric" type="text" label=" Enter Reset Code" radius="full" className='h-11 w-3/4 mx-auto' onChange={formik.handleChange} value={formik.values.resetCode} onBlur={formik.handleBlur}/>
        {formik.touched.resetCode && formik.errors.resetCode ? (
         <div className='text-red-500'>{formik.errors.resetCode}</div>
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
