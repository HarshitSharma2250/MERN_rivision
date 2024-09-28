const {Router}=require("express")
const TodoRouter=Router()
const {createTodo,getData,ToggleData,DeleteTask,UpdateTodo}=require("../controller/todo.controller")

TodoRouter.post("/todo/add",createTodo)
TodoRouter.get("/todo/get",getData)
TodoRouter.patch("/todo/toogle/:id",ToggleData)
TodoRouter.delete("/todo/delete/:id",DeleteTask)
TodoRouter.patch("/todo/update/:id",UpdateTodo)

module.exports=TodoRouter