import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Update } from '../components\'/Update'
import { UpdateTask } from '../components\'/UpdateTask'

export const MyRouyes = () => {
  return (
 <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path="/update" element={<Update/>}/>
    <Route path="/updateall/:id" element={<UpdateTask/>}/>
 </Routes>
  )
}
