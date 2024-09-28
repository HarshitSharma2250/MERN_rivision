import { Button, Flex, Input, Stack, } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { ContextInfo } from '../Context/ContextApi'
import { useNavigate, useParams } from 'react-router-dom'

export const UpdateTask = () => {
const{state,setstate}=useContext(ContextInfo)
const[data,setdata]=useState({name:'',email:'',status:false})
const{id}=useParams()
const navigate=useNavigate()


useEffect(()=>{
const findTask=state.find(ele=>ele._id==id)
setdata({...data,...findTask})
console.log(findTask)
},[id])

function HandleText(e){
    let values=e.target.type=="checkbox"?e.target.checked:e.target.value
setdata({
    ...data,
    [e.target.name]:values
})
}

async function HandleSubmit(e){
    e.preventDefault()
    await fetch(`/api/todo/update/${id}`,{
        method:"PATCH",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(data)
    }) 
    setstate((ele)=>ele.map(item=>item.id===id ? {...item,...data}:item))
    navigate('/')
}
  return (
  <>
 <form onSubmit={HandleSubmit} >
<Stack spacing={3}>
  <Input placeholder='enter your name' size='md' value={data.name} name='name' onChange={HandleText}/>
  <Input placeholder='enter your email' size='md'  value={data.email} name='email' onChange={HandleText}/>
<Flex alignItems={"center"} gap="10px"><span>Status:</span>
<input type="checkbox"  value={data.status} name='status' onChange={HandleText} style={{height:"25px",width:"25px"}}/>
</Flex>
<Button type='submit'>submit</Button>
</Stack>
                  </form>
  
  </>
  )
}
