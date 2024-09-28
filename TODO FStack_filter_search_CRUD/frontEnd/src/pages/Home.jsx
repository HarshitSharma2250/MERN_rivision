import { Box,  Button,  Flex,  Input,  Select,  Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import{ useCallback, useContext, useEffect, useState } from 'react'
import {Link, useSearchParams} from "react-router-dom"
import { CreateTodo } from '../components\'/CreateTodo'
import { ContextInfo } from '../Context/ContextApi'
import axios from "axios"
export const Home = () => {
    const{state,setstate}=useContext(ContextInfo)
    const[searchparams,setsearchparams]=useSearchParams()
    const[status,setstatus]=useState(searchparams.get('status')||'All')
    const[fname,setname]=useState(searchparams.get("fname"))
    const [debouncedFname, setDebouncedFname] = useState(fname);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedFname(fname);
      }, 500);
      return () => {
        clearTimeout(handler);
      };
    }, [fname]);

useEffect(()=>{
  setsearchparams((prevparams)=>{
  const newparams=new URLSearchParams(prevparams)
  newparams.set('status',status)
  newparams.set('name',debouncedFname)
  return newparams;
})
RenderData(status,debouncedFname)
    },[status,debouncedFname])

async function RenderData(status){
  let obj={}
  if(status!='All'){
    obj['filter']=status=="true"?true:false
  }
  if(fname){
    obj['name']=debouncedFname
  }
    try {
        const res=await axios.get(`/api/todo/get`,{params:obj})
setstate(res.data)
    } catch (error) {
       console.log(error.message) 
    }
}

 const HandleClick= useCallback(async(id)=>{
try {
    await fetch(`/api/todo/toogle/${id}`,{
        method:"PATCH",
        headers:{"content-type":"application/json"},
    })
   setstate((ele)=>ele.map((item)=>item._id==id?{...item,status:!item.status}:item))
} catch (error) {
    console.log(error.message)
}
 },[])

const HandleDelete=useCallback(async(id)=>{
try {
    await fetch(`api/todo/delete/${id}`,{
        method:"DELETE",
        headers:{"content-type":"application/json"}
    })
    setstate(ele=>ele.filter((item)=>item._id!==id))
} catch (error) {
    console.log(error.message)
}

},[])

// filter status
function HandleStatus(e){
  setstatus(e.target.value)
}
  return (
<>
<Flex justifyContent={'space-around'} alignItems={'center'}>
  <Box>
    <Box>
     <Select  onChange={HandleStatus}>
  <option value="All">select task</option>
  <option value={true}>complete</option>
  <option value={false}>pending</option>
</Select>
    </Box>
    <Box>
      <Input type='text' value={fname} name='fname' onChange={(e)=>setname(e.target.value)} placeholder='enter your name' />
    </Box>
  </Box>
        <CreateTodo/>
    </Flex>
<TableContainer>
  <Table variant='striped' colorScheme='teal'>
    <Thead>
      <Tr>
        <Th>S.No</Th>
        <Th>Name</Th>
        <Th >Email</Th>
        <Th>status</Th>
        <Th>operations</Th>

      </Tr>
    </Thead>
    <Tbody>
      {
        state && state.map((ele)=>(
            <Tr key={ele._id}>
                <Td>{ele._id}</Td>
                <Td>{ele.name}</Td>
                <Td>{ele.email}</Td>
                <Td>{ele.status ? "complete":"pending"}</Td>
                <Td  onClick={()=>HandleClick(ele._id)} ><Button bgColor={'orange'} cursor={"pointer"}>toggle</Button></Td>
                <Td ><Link to={`/updateall/${ele._id}`}><Button bgColor={'yellow'} cursor={"pointer"}>eddit</Button></Link></Td>
                <Td  onClick={()=>HandleDelete(ele._id)}><Button bgColor={'red'} cursor={"pointer"}>delete</Button></Td>
            </Tr>
        ))
      }
    </Tbody>
  </Table>
</TableContainer>

</>
  )
}
