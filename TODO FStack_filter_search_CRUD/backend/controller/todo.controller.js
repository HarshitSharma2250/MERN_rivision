const TodoSchema=require("../model/todo.model")

const createTodo=async(req,res)=>{
    const data=req.body
    try {
        const addData=await TodoSchema.create(data)
        res.status(201).send(addData)
    } catch (error) {
        res.status(500).json({
            message:error.data
        })
    }
}
const getData=async(req,res)=>{
    const{filter,name}=req.query
    try {
        let query={}
  if (filter && filter !== "All") {  // Only filter if not "All"
      query.status = filter === "true";
    }
    if(name){
        query.name={$regex:name,$options:"im"}
    }
        const getdata=await TodoSchema.find(query)
        res.status(200).json(getdata)
    } catch (error) {
        res.status(500).json({
            message:error.data
        })
    }
}

const ToggleData=async(req,res)=>{
    const{id}=req.params
    try {
        const checkData=await TodoSchema.findById({_id:id})
        if(!checkData){
            return res.status(404).json({
                message:"data not found"
            })
        }
        const changeStatus=await TodoSchema.updateOne({_id:checkData.id},{$set:{status:!checkData.status}})
        res.status(201).json(changeStatus)
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

const DeleteTask=async(req,res)=>{
    const {id}=req.params
    try {
        const gettask=await TodoSchema.findById(id)
        if(!gettask){
            return res.status(404).json({
                message:"data not found"
            })
        }
        await TodoSchema.findByIdAndDelete({_id:gettask._id})
        res.status(204).json({
            "messaage":"task deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

const UpdateTodo=async(req,res)=>{
    const data=req.body
    const{id}=req.params
    try {
        const searchData=await TodoSchema.findOne({_id:id})
        if(!searchData){
            return res.status(404).json({
                message:"data is not found"
            })
        }
        await TodoSchema.findByIdAndUpdate({_id:searchData._id},data)
        res.status(201).json({
            message:"data has updated"
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}


module.exports={createTodo,getData,ToggleData,DeleteTask,UpdateTodo}