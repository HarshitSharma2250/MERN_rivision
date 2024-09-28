import React, { createContext, useState } from 'react'

export const ContextInfo=createContext()

export const ContextApi = ({children}) => {
    const[state,setstate]=useState([])
  return (
<ContextInfo.Provider value={{state,setstate}}>
    {children}
</ContextInfo.Provider>
  )
}
