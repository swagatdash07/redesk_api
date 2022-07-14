const projectModel=require("../models/project");

exports.createProject= (req,res)=>{
 projectModel.create(req.body).then((project)=>{
        if(project){
            return res.status(200).json({status:'200',message: "Successfully added Project"})
        }
      }).catch((err)=>{
        return res.status(400).json({status:'400',error: "Unable to save user to DB", err})
    })
}

exports.getProject=(req,res)=>{
    projectModel.find((err,docs)=>{
        if(!err){
            return res.status(200).json({status:'200',message: "Project List",docs})
        }else{
            return res.status(400).json({status:'400',error:"Failed to retrieve the Project List",err})
        }
    })
}

exports.editProject=(req,res)=>{
    const condition={_id:req.params.id};
    projectModel.updateMany(condition,req.body).then((docs)=>{
        if(!docs){
          return res.status(400).json({status:'400',message:"Failed to Update"}) 
        }
      return res.status(200).send({status:'200',message:'Succesffully Updated Project',docs})
    }).catch((err)=>{
      return res.status(400).send(err)
    })
}