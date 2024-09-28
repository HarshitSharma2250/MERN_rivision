import { Link } from 'react-router-dom'
import { MyRouyes } from './AllRoutes/MyRouyes'
import { Box } from '@chakra-ui/react'

function App() {


  return (
    <>
 <Box textAlign={'center'}>
 <Link to='/'>ToDo List</Link>
 </Box>
    <MyRouyes/>
    </>
  )
}

export default App
