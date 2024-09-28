const express=require("express")
const connection=require("./config/db")
require("dotenv").config()
const PORT=process.env.PORT||3000
const TodoRouter=require("./routes/todo.toute")
const cors = require('cors')

// initiate server
const server=express()


// middleware
server.use(cors())
server.use(express.json())
server.use("/api",TodoRouter)


// server listening
server.listen(PORT,async()=>{
    try {
        await connection()
        console.log(`server is running at port ${PORT}`)
    } catch (error) {
        console.log(error.message)
    }
})
