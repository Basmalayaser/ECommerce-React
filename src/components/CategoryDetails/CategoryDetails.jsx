import React, { useContext, useEffect, useState } from 'react'
import style from './CategoryDetails.module.css'
import { useParams } from 'react-router-dom'
import { CategoryContext } from '../../Context/CategoryContext';
import { ProductContext } from '../../Context/RelatedProductContext';
import RelatedProduct from '../RelatedProduct/RelatedProduct';
import Loader from '../Loader/Loader';
import CategorySlider from '../CategorySlider/CategorySlider';


export default function CategoryDetails() {

  const {id}=useParams()
  const {allCategories} = useContext(CategoryContext);
  const { setRelatedProduct} = useContext(ProductContext);
  const [filterdData,setRelatedData]=useState([])
  const [isloading,setisloading]=useState(true)

  console.log(allCategories)


  useEffect(()=>{
    setRelatedProduct(id)
    localStorage.setItem("categoryId",id)
    setisloading(false)
  },[id])
  

  return (
    <>
      {isloading?<Loader/>:<>
        <div className="pt-14"></div>
        <CategorySlider/>
        <div className="px-20 pb-10"><RelatedProduct/></div>
      </>}
      
      
    </>
  )
}
