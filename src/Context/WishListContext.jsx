
import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import toast from "react-hot-toast";


export let WishListContext =createContext()

export default function WishListProvider(props) {

      const [wishListItems,setwishListItems]=useState([])
      const[noOfWishList,setNoOfwishList]=useState(0)


    let headers={
        token:localStorage.getItem("userToken")
    } 

    async function addProductToWishlist(productId) {
       return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
        productId
       },{
        headers
       }).then((response)=>{
        toast.success(response.data.message)
        setwishListItems(response.data.data)
        return response
    }).catch((error)=>{
        toast.error(error.message)
        return error
    })}

    async function removeProductFromWishlist(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
         headers
        }).then((response)=>{
         toast.success(response.data.message)
         setwishListItems(response.data.data)
         return response
     }).catch((error)=>{
         toast.error(error.message)
         return error
     })
         
     }


     async function getAllProductFromWishlist() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
            headers :{token:localStorage.getItem("userToken")}
        }).then((response)=>{
         setNoOfwishList(response.data.count)
         return response
     }).catch((error)=>{
         return error
     })
         
     }

  return <WishListContext.Provider value={{addProductToWishlist,wishListItems,removeProductFromWishlist,getAllProductFromWishlist,noOfWishList,setwishListItems,setNoOfwishList}}>
            {props.children}
         </WishListContext.Provider>
}

