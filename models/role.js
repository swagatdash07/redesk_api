const mongoose=require('mongoose');
const Schema=mongoose.Schema

const roleSchema= new Schema({
    role_name:{
        type:String,
        required: true
    },
    role_type:{
        type:String
    }
})
const Role=new mongoose.model("Role",roleSchema)
module.exports=Role;

