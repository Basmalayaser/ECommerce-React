import React, { useState } from 'react'
import style from './Register.module.css'
import {Input ,Card, CardBody, Spinner} from "@nextui-org/react";
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { data } from 'autoprefixer';
import { useNavigate } from 'react-router-dom';
import {Snippet,spinner} from "@nextui-org/react";


export default function Register() {

  const [userError,setUserError]=useState(null)
  const [IsLoading,setIsLoading]=useState(false)

  let navigate =useNavigate()

  const formik = useFormik({
    initialValues: {
      name: "",
      email:"",
      password:"",
      rePassword:"",
      phone:""
    },
    validationSchema: Yup.object({
      name:Yup.string().min(3,"minimum 3 characters").max(15,"maximum 15 character"),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password:Yup.string().required('Password is required').matches(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/,"Password is not valid"),
      rePassword:Yup.string().required('RePassword is required').oneOf([Yup.ref("password")],"not match password"),
      phone:Yup.string().required("enter phon number").matches(/^(002)?01[0125][0-9]{8}$/,"not valid phone")
    }),

    onSubmit: (values) => {
      regesterForm(values);
    },})

   async function regesterForm(values){
       setIsLoading(true)
       return await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values).then((data)=>{
        setIsLoading(false)
        navigate("/login")
       }).catch((error)=>{
        setIsLoading(false)
        setUserError(error.response.data.message)
       })
    }


  return (
    <>
     <div className={` flex justify-center items-center h-screen bg_Image`}>
     <Card  className='p-5 min-w-[30%] mt-10'>
     <CardBody>

     <form className="text-center" onSubmit={formik.handleSubmit}>
       
        <h2 className='text-3xl font-bold text-orange-500 pb-5 f_roboto'>Create your account</h2>
        <p> </p>
        {userError? <Snippet color="danger" hideSymbol="false" hideCopyButton="false" className="mb-4 w-full">{userError}</Snippet>:null}
        <div className="mb-4">
        <Input name='name' id='name' type="text" label="Name" radius="full" className='h-11 w-4/5 mx-auto ' onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur}/>
        {formik.touched.name && formik.errors.name ? (
         <div className='text-red-500'>{formik.errors.name}</div>
        ) : null}
        </div>

        <div className="mb-4">
        <Input name='email' id='email' type="email" label="Email" radius="full" className='h-11 w-4/5 mx-auto' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur}/>
        {formik.touched.email && formik.errors.email ? (
         <div className='text-red-500'>{formik.errors.email}</div>
       ) : null}
        </div>

        <div className="mb-4">
        <Input name='phone' id='phone' type="tel" label="Phone" radius="full" className='h-11 w-4/5 mx-auto'onChange={formik.handleChange} value={formik.values.phone} onBlur={formik.handleBlur}/>
        {formik.touched.phone && formik.errors.phone
         ? (
         <div className='text-red-500'>{formik.errors.phone}</div>
       ) : null}
        </div>

        <div className="mb-4">
        <Input name='password' id='password' type="password" label="Password" radius="full"  className='h-11 w-4/5 mx-auto' onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur}/>
        {formik.touched.password && formik.errors.password ? (
         <div className='text-red-500'>{formik.errors.password}</div>
       ) : null}
        </div>

        <div className="mb-4">
        <Input name='rePassword' id='rePassword' type="password" label="RePassword" radius="full" className='h-11 w-4/5 mx-auto'onChange={formik.handleChange} value={formik.values.rePassword} onBlur={formik.handleBlur} />
        {formik.touched.rePassword && formik.errors.rePassword ? (
         <div className='text-red-500'>{formik.errors.rePassword}</div>
       ) : null}
        </div>

       <button type="submit" disabled={!(formik.isValid && formik.dirty)} className='px-14 py-3 bg-orange-500 text-white rounded-full f_roboto'>
       {IsLoading?<Spinner  color="praimery"/>:"SignUp"}</button>

      </form>

      </CardBody>
      </Card>
      </div>
    </>
  )
}
