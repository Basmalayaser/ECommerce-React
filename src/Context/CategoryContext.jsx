import { createContext, useEffect, useState } from "react";

export let CategoryContext =createContext()

export default function CategoryContextProvider(props) {
  const [allCategories,setAllCategories]=useState([]);


  
  useEffect(()=>{
    setAllCategories(localStorage.getItem("allCategory"))
  },[])

  return <CategoryContext.Provider value={{allCategories,setAllCategories}}>
            {props.children}
         </CategoryContext.Provider>
}
