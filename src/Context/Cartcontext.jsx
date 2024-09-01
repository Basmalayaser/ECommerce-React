import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { reach } from "yup";
import {Badge} from "@nextui-org/badge";

export let CartContext =createContext()

export default function CartContextProvider(props) {

    const[noOfCartItem,setNoOfCartItem]=useState(0)
    const[totalPrice,setTotalPrice]=useState(0)
    const[cartId,setcartId]=useState(null)

  let headers={
    token:localStorage.getItem("userToken")
}

 async function addProductToCart(productId){
    return  await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
        productId
    },{
        headers
    }).then((response)=>{
        toast.success(response.data.message)
        setNoOfCartItem(response.data.numOfCartItems)
        setTotalPrice(response.data.data.totalCartPrice)
        setcartId(response.data.data._id)
        return response
    }).catch((error)=>{
        toast.error(error.message)
  
        return error
    })

  }


  async function getCartProduct(){
    return  await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
        headers :{token:localStorage.getItem("userToken")}
    }).then((response)=>{
        setNoOfCartItem(response.data.numOfCartItems)
        setTotalPrice(response.data.data.totalCartPrice)
        setcartId(response.data.data._id)
        return response
    }).catch((error)=>{
        return error
    })

  }

  async function deleteItem(id){
    return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
        headers
    }).then((response)=>{
        toast.success(response.data.status)
        setTotalPrice(response.data.data.totalCartPrice)
        return response
    }).catch((error)=>{
        toast.error(error)
    })
  }

  async function UpdateProductQuantity(id,count){
    return await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
        count
    },{
        headers
    }).then((response)=>{
        toast.success(response.statusText)
        setTotalPrice(response.data.data.totalCartPrice)
        setcartId(response.data.data._id)
        return response
    }).catch((error)=>{
        toast.error(error)
        return error
    })
  }


  async function clearCart(){
    return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
        headers
    }).then((response)=>{
        return response
    }).catch((error)=>{
        return error
    })
  }


  async function onlinePayment(shippingAddress){
    return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,{
        shippingAddress
    },{
        headers
    }).then((response)=>{
        setNoOfCartItem(response.data.numOfCartItems)
        // setTotalPrice(response.data.data.totalCartPrice)
        location.href=response.data.session.url
         return response
    }).catch((error)=>{
        console.log(error)
        return error
    })
  }


  async function cashPayment(shippingAddress){
    return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{
        shippingAddress
    },{
        headers
    }).then((response)=>{
        setNoOfCartItem(response.data.numOfCartItems)
        setTotalPrice(response.data.data.totalCartPrice)
        window.location.href="http://localhost:5173/allorders"
         return response
    }).catch((error)=>{
        console.log(error)
        return error
    })
  }



  return <CartContext.Provider value={{addProductToCart ,getCartProduct,UpdateProductQuantity ,deleteItem,clearCart,noOfCartItem,totalPrice,setNoOfCartItem,onlinePayment,cashPayment}}>
            {props.children}
         </CartContext.Provider>
}
