import React, { useContext, useEffect, useState } from 'react'
import styles from './GetProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Loader from '../Loader/Loader'
import RelatedProduct from '../RelatedProduct/RelatedProduct'
import { ProductContext } from '../../Context/RelatedProductContext'
import { CartContext } from '../../Context/Cartcontext'
import { Helmet } from 'react-helmet'
import { WishListContext } from '../../Context/WishListContext'




export default function GetProductDetails() {

  const [details,setDetails]=useState({})
  const [isLoading,setLoading]=useState(true)
  const [errorMessage,setErrorMessage]=useState(null)
  const [sliderImg,setSliderImg]=useState('')
  let {relatedProduct,setRelatedProduct}=useContext(ProductContext)
  let {addProductToCart}=useContext(CartContext)
  let{ addProductToWishlist,wishListItems,removeProductFromWishlist,getAllProductFromWishlist} =useContext(WishListContext)


  let {id,categoryId}=useParams()


 async function GetDetails(){
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`).then((data)=>{
      setLoading(false)
      setDetails(data.data.data)
      
    }).catch((error)=>{
      setLoading(false)
      setErrorMessage(error.message)
    })
  }

  useEffect(()=>{
    GetDetails()
  },[])

  useEffect(()=>{
    setRelatedProduct(categoryId)
    localStorage.setItem("categoryId",categoryId)
  },[categoryId])

  useEffect(()=>{
    GetDetails()
    setLoading(true)
  },[id])


  function sliderURL(url){
    setSliderImg(url)
  }

  async function addToCart(productId){
    let responce= await addProductToCart(productId)
    console.log(responce)
 }

 async function getWishList(){
  await  getAllProductFromWishlist()
 }


 async function addToCart(productId){
    await addProductToCart(productId)
}

async function addToWish(productId){
  await addProductToWishlist(productId)
  await getWishList()
}

async function removeFromWish(productId){
  await removeProductFromWishlist(productId)
  await getWishList()
}

function toggleWishlistItem(item){
  
if (wishListItems.includes(item.id)) {
  return  removeFromWish(item.id)
} else{
  return  addToWish(item.id)
}

}

  return (
    <>
     {errorMessage?<div className="text-center bg-red-400 text-white p-40">{errorMessage}</div>:""}
     {isLoading?<Loader/>:
    <div className="bg-gray-100 p-20 ">
    <div className="sm:flex bg-white rounded-xl shadow-xl ">
    <div className="productImage drop-shadow-md bg-white m-5 rounded relative overflow-hidden">
        <div className="mainImg p-3">
           <img src={sliderImg?sliderImg:details.imageCover} alt={details.title} className='w-72 mx-auto'/>
           <div className="slider">
              <div className="flex pt-3 justify-center">
                {details.images.map((src)=><div className='sliderImg border-1 p-1 cursor-pointer' onClick={()=>{sliderURL(src)}}><img src={src} alt=''className='w-[70px] h-[70px]' /></div>)}
              </div>
           </div>
      </div>
      {/* <div className="insideCard cursor-pointer">
              <div className="iconCard cursor-pointer">
              <i className="fa-regular fa-heart text-xl"></i>
              </div>
        </div> */}


           <div className="insideCard">
              <div onClick={()=>{toggleWishlistItem(details)}} className="iconCard cursor-pointer">
              {wishListItems.includes(details.id) ? <i className="fa-solid fa-heart text-blue-500"></i>: <i className="fa-regular fa-heart text-xl text-blue-500"></i>}
              
              </div>
            </div>  
    </div>
    <div className='productInfo p-5 grid  items-center'>
      <div className="">
      <div className={styles.title}>
        <h3>{details.title}</h3>

        <Helmet>
                <meta charSet="utf-8" />
                <title>{details.title}</title>
            </Helmet>
        <span>Brand : {details.brand?.name}</span>
      </div>
      <div className={styles.price}>
        <span>{details.price} EGP</span>
      </div>
      <div className={styles.description}>
      <p className=''>{details.description}</p>
      </div>
      <button  onClick={()=>addToCart(details.id)} className={styles.buyBtn}>ADD TO CART</button>
    </div>
      </div>
    </div>
    <RelatedProduct/>
    </div> 

}

    </>
  )
}
