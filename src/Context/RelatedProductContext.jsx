
import React, { createContext, useEffect, useState } from 'react'


export let ProductContext =createContext()

export default function ProductContextProvider(props) {
  const [relatedProduct,setRelatedProduct]=useState([]);

  //handle reload
  useEffect(()=>{
    setRelatedProduct(localStorage.getItem("categoryId"))
  },[])

  return <ProductContext.Provider value={{relatedProduct,setRelatedProduct}}>
            {props.children}
         </ProductContext.Provider>
}
