
import React, { createContext, useEffect, useState } from 'react'


export let TokenContext =createContext()

export default function TokenContextProvider(props) {
  const [token,setToken]=useState(null);

  //handle reload
  useEffect(()=>{
    setToken(localStorage.getItem("userToken"))
  },[])

  return <TokenContext.Provider value={{token,setToken}}>
            {props.children}
         </TokenContext.Provider>
}
