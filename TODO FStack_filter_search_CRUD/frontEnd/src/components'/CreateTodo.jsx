import React, { useContext, useEffect, useRef } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Stack,
    Input,
    Flex,
    Divider,
  } from '@chakra-ui/react'
import { ContextInfo } from '../Context/ContextApi'
export const CreateTodo = () => {
 const { isOpen, onOpen, onClose } = useDisclosure()
const{state,setstate}=useContext(ContextInfo)
const name=useRef('')
const email=useRef('')
const status=useRef(false)

async function HandleSubmit(e){
    e.preventDefault()

 const res=await fetch(`api//todo/add`,{
    method:"POST",
    headers:{"content-type":"application/json"},
    body:JSON.stringify({name:name.current.value,email:email.current.value,status:status.current.checked})
})
const data=await res.json()
setstate([...state,data])
}
        return (
          <>
            <Button onClick={onOpen} 
            bgColor={'green'}
            _hover={{bgColor:"green"}}
            >create Todo</Button>
            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>create new task for todo list</ModalHeader>
                <Divider m="10px 0px"/>
                <ModalCloseButton />
                <ModalBody>
                  <form onSubmit={HandleSubmit} >
                  <Stack spacing={3}>
  <Input placeholder='enter your name' size='md' ref={name}/>
  <Input placeholder='enter your email' size='md' ref={email} />
<Flex alignItems={"center"} gap="10px"><span>Status:</span>
<input type="checkbox" ref={status}  style={{height:"25px",width:"25px"}}/>
</Flex>
<Button type='submit' onClick={onClose}>submit</Button>
</Stack>
                  </form>
                </ModalBody>
              </ModalContent>
            </Modal>
          </>
        )
      }
