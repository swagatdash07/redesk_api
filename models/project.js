const mongoose=require('mongoose');
const Schema=mongoose.Schema

const projectSchema= new Schema({
    project_name:{
        type:String,
        required: true
    },
    project_desc:{
        type: String,
        required:true
    },
    project_template:{
        type:String
    },
    project_label:{
        type:String
    },
    project_category:{
        type:String,
        required:true
    },
    project_client:{
        type:String,
        required:true
    },
    project_status:{
        type:Number,
        required:true
    },
    user_id:{
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            }
        ],
    }
},{ timestamps: true })
                      
module.exports= mongoose.model("Project",projectSchema);


