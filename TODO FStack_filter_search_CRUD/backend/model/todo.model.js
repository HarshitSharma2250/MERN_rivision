const{Schema,model}=require("mongoose")

const TodoSchema=new Schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    status:{type:Boolean,default:false}
},{
    versionKey:false,
    timestamps:true
})
module.exports=model("todo",TodoSchema)