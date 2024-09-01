import React, { useContext, useEffect, useState } from 'react'
import style from './WishList.module.css'
import { WishListContext } from '../../Context/WishListContext'
import Loader from '../Loader/Loader'
import { CartContext } from '../../Context/Cartcontext'
import { Helmet } from 'react-helmet'

export default function WishList() {

  const[wishlistItems,setWishlistItems]=useState([])
  const[isLoading,setisLoading]=useState(true) 

  let{ removeProductFromWishlist,getAllProductFromWishlist} =useContext(WishListContext)
  let {addProductToCart}=useContext(CartContext)

 useEffect(()=>{
  getWishlist()
},[])

useEffect(()=>{
  getWishlist()
},[wishlistItems])

 async function getWishlist() {
    let response=  await  getAllProductFromWishlist()
    setWishlistItems(response.data.data)
    console.log(response)
    setisLoading(false)
 }


   async function deleteFromWishList(id){
     let response= await removeProductFromWishlist(id)
     setWishlistItems(response.data.data)
  }

  async function addToCart(productId){
    await addProductToCart(productId)
    setWishlistItems(response.data.data)
   
 }
  
  return (
    <>
    {isLoading?<Loader/>: <div className="bg-[#eee] min-h-screen pb-10">
      <div className={`container mx-auto xl:px-20 p-5`}>
   
       <div className="flex justify-between py-6 ">
           <h2 className='f_roboto text-2xl font-bold'>Wish List :</h2>
            <button className={` text-red-500  hover:text-white hover:bg-red-500 transition-all  py-1 px-5 text-lg`}>DELETE CART</button>
       </div>
     
     <table className="w-full ">
     <tbody>
                   {wishlistItems.length === 0 ? (
                     <tr>
                       <td colSpan="6" className="py-4 text-center">No items in the WislList.</td>
                     </tr>
                   ) : (
                    wishlistItems.map((item) => (
                       <tr key={item.id} className="bg-white py-5 ">
                         <td className="py-2 ps-3">
                           <img className=" mx-auto" src={item.imageCover} width="100" alt="Product" />
                         </td>
                         <td>
                           <p className="font-bold text-xl">{item.title?.split(" ").slice(0,5).join(" ")}</p>
                           <p className='text-orange-500 text-xl font-semibold py-1'>{item.price} EGP</p>
                           <i onClick={()=>{deleteFromWishList(item.id)}} className="fa fa-trash mb-1 text-danger cursor-pointer"></i>
                         </td>
                         <td>
                         <div  onClick={()=>addToCart(item.id)} className="bg-orange-500 text-white text-xl px-8 py-3 text-center cursor-pointer me-5">
                             Add To Cart
                         </div>
                         </td>
                       </tr>
                     ))
                   )}
                 </tbody>

   </table>

   </div>
   </div>}

           <Helmet>
                <meta charSet="utf-8" />
                <title>Wish List</title>
            </Helmet>
   </>
  )
}
