import React, { useContext, useState } from 'react'
import style from './Login.module.css'
import {Input ,Card, CardBody, Snippet,Spinner} from "@nextui-org/react";
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { TokenContext } from '../../Context/TokenContext';
import { CartContext } from '../../Context/Cartcontext';
import { WishListContext } from '../../Context/WishListContext';


export default function Login() {

  const [userError,setUserError]=useState(null)
  const {token,setToken}=useContext(TokenContext)
  const [IsLoading,setIsLoading]=useState(false)
  
  const { noOfCartItem,getCartProduct} = useContext(CartContext);
  const { setNoOfwishList,setwishListItems,noOfWishList,getAllProductFromWishlist} = useContext(WishListContext);

  let navigate =useNavigate()

  const formik = useFormik({
    initialValues: {
      email:"",
      password:"",
    },

    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password:Yup.string().required('Password is required').matches(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/,"Password is not valid"),
    
    }),
    onSubmit: (values) => {
     loginForm(values);
    },})

    
async function getCart() {
 let response= await getCartProduct();
  console.log(response,'cartlogin')
}

async function getWishList() {
  let response =await getAllProductFromWishlist();
   console.log(response,"WishLogin")
}

   async function loginForm(values){
    setIsLoading(true)
       return await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values).then( (data)=>{
        setIsLoading(false)
        setToken(data.data.token)
        localStorage.setItem("userToken",data.data.token)
        // navigate("/")
        getWishList()
        getCart()
        setwishListItems(localStorage.getItem("wishListItems"))
        navigate("/")

       }).catch((error)=>{
        setIsLoading(false)
        setUserError(error.message)
       })
    }



  return (
    <>
     <div className={` flex justify-center items-center h-screen bg_Image`}>
     <Card  className='px-10 py-5 min-w-[30%] mt-10'>
     <CardBody>

     <form onSubmit={formik.handleSubmit}>
        <div className="text-center">
        <h2 className='text-4xl font-bold text-orange-500 pb-2 f_roboto'>Welcome back!</h2>
        <p className='text-gray-500 pb-5'>Login to your account</p>
        </div>
       <div className="text-center">
       {userError? <Snippet color="danger" hideSymbol="false" hideCopyButton="false" className="mb-4 w-full">{userError}</Snippet>:null}

       <div className="mb-4">
        <Input name='email' id='email' type="email" label="Email" radius="full" className='h-11 w-4/5 mx-auto' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur}/>
        {formik.touched.email && formik.errors.email ? (
         <div className='text-red-500'>{formik.errors.email}</div>
       ) : null}
        </div>

        <div className="mb-4">
        <Input name='password' id='password' type="password" label="Password" radius="full"  className='h-11 w-4/5 mx-auto' onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur}/>
        {formik.touched.password && formik.errors.password ? (
         <div className='text-red-500'>{formik.errors.password}</div>
       ) : null}
        </div>
       </div>


        <div className="flex justify-between items-center">
          <div className="hover:text-orange-500 transition-all">
          <Link to="/forgetPass" >
             forget your password ?
          </Link>
          </div>
          <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='px-14 py-3 bg-orange-500 text-white rounded-full f_roboto '>
          {IsLoading?<Spinner  color="praimery"/>:"LogIn"}</button>
        </div>
      </form>

      </CardBody>
      </Card>
      </div>
    </>
  )
}
