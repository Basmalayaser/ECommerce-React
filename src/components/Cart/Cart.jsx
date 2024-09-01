import React, { useContext, useEffect, useMemo, useState } from 'react'
import styles from './Cart.module.css'
import { CartContext } from '../../Context/Cartcontext'
import Loader from '../Loader/Loader'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { Helmet } from 'react-helmet'


export default function Cart() {
 
  let {getCartProduct,deleteItem,UpdateProductQuantity,clearCart,setNoOfCartItem,totalPrice}=useContext(CartContext)
  const[cartItems,setCartItems]=useState([])
  const[isLoading,setisLoading]=useState(true)


  async function getCart(){
    let response= await getCartProduct()
    setCartItems(response.data.data.products)
    setNoOfCartItem(response.data.numOfCartItems)
    setisLoading(false)
  }

  useEffect(()=>{
    getCart()
  },[])


   async function deleteProduct(productId){
    let response= await deleteItem(productId)
    setCartItems(response.data.data.products)
    setNoOfCartItem(response.data.numOfCartItems)
    console.log(response)
  }

  async function updateProduct(productId,count){
    let response= await UpdateProductQuantity(productId,count)
    setCartItems(response.data.data.products)
    console.log(response)
  }

  async function clearUseCart(){
    let response = await clearCart()
    setCartItems([])
    setNoOfCartItem(response.data.numOfCartItems)
  }


  return (
    <>
   {isLoading?<Loader/>: <div className="bg-[#eee] min-h-screen">
   <div className={`container mx-auto xl:px-20 p-5`}>

    <div className="flex justify-between py-6 ">
        <h2 className='f_roboto text-2xl font-bold'>Shopping cart :</h2>
         <button onClick={()=>{clearUseCart()}} className={` text-red-500  hover:text-white hover:bg-red-500 transition-all  py-1 px-5 text-lg`}>DELETE CART</button>
    </div>
  
  <table className="w-full ">
  <thead className=''>
    <tr className='bg-white border-b-1'>
    <th className='py-5 font-bold f_roboto  md:text-xl text-lg'></th>
      <th className='py-5 font-bold f_roboto  md:text-xl text-lg'>Prodect Name</th>
      <th className='py-5 font-bold f_roboto  md:text-xl text-lg'>QTR</th>
      <th className='py-5 font-bold f_roboto  md:text-xl text-lg'>Price</th>
      <th className='py-5 font-bold f_roboto  md:text-xl text-lg'>Total Price</th>
      <th className='py-5 font-bold f_roboto  md:text-xl text-lg'>Delete Item</th>
    </tr>
  </thead>
  <tbody>
                {cartItems.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-4 text-center">No items in the cart.</td>
                  </tr>
                ) : (
                  cartItems.map((item) => (
                    <tr key={item.product.id} className="bg-white py-5 text-center">
                      <td className="py-2 ps-3">
                        <img className=" mx-auto" src={item.product.imageCover} width="100" alt="Product" />
                      </td>
                      <td>
                        <p className="font-bold">{item.product.title.split(" ").slice(0,5).join(" ")}</p>
                      </td>
                      <td >
                        <div className='flex'>
                          <i onClick={()=>{updateProduct(item.product.id,item.count-1)}} className="fa fa-minus text-danger px-1 text-xl border cursor-pointer hover:border-orange-500"></i>
                          <h5 className="text-grey px-3">{item.count}</h5>
                          <i onClick={()=>{updateProduct(item.product.id,item.count+1)}} className="fa fa-plus text-success px-1 text-xl border cursor-pointer hover:border-orange-500"></i>
                        </div>
                      </td>
                      <td >
                        <p className='text-gray-400'>{item.price} EGP</p>
                      </td>
                      <td>
                        <p className='text-gray-400'>{item.price * item.count} EGP</p>
                      </td>
                      <td>
                        <i onClick={()=>{deleteProduct(item.product.id)}} className="fa fa-trash mb-1 text-danger cursor-pointer"></i>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              <tfoot className='bg-white py-5  w-full text-center font-bold text-xl'>
                   <tr >
                        <td colSpan="6"  className='py-5'><span className='text-orange-500 pe-3'>Total Price : </span>{totalPrice}</td>
                   </tr>
               </tfoot>
</table>
 <Dropdown >
      <DropdownTrigger>
        <Button 
          variant="bordered" 
          className="my-8 bg-orange-500 text-white w-full rounded-none border-0 py-6 text-xl"
        >
          Checkout
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
      >
        <DropdownItem ><Link to={"/checkout/Online Payment"}>Online Payment</Link></DropdownItem>
        <DropdownItem ><Link to={"/checkout/Cash Payment"}>Cash Payment</Link></DropdownItem>
      </DropdownMenu>
    </Dropdown>
</div>
</div>}

<Helmet>
                <meta charSet="utf-8" />
                <title>Cart</title>
            </Helmet>
    </>
  )
}
