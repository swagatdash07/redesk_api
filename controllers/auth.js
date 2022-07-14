const User = require('../models/user')
const jwt = require("jsonwebtoken")
const expressJwt = require("express-jwt")
const { validationResult, check } = require('express-validator')



exports.signup = (req, res) => {
  const errors = validationResult(req)

  if(!errors.isEmpty()) {
    return res.status(400).json({status:'400',
      error: errors.array()[0].msg
    })
  }

  // Check whether email already exists
  const {email} = req.body
  User.findOne({email}, (err, email) => {
    if(err || email) {
      return res.status(400).json({status:'400',
        error: "Email already exists"
      })
    }

    // If email don't exist, create user
    const user = new User(req.body)
    user.save((err, user) => {
      if(err) {
        return res.status(400).json({status:'400',error: "Unable to save user to DB", err})
      }
       return res.status(200).json({status:'200',message: "Successfully added user",
        user: {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          id: user._id,
          role: user.user_type
        }
      })
    })
  })
}

exports.signin = (req, res) => {
  const {email, password} = req.body

  User.findOne({email}, (err, user) => {
    if(err || !user) {
      return res.status(400).json({status:'400',
        error: "Email does not exists"
      })
    }

    if(!user.authenticate(password)) {
      return res.status(400).json({status:'400',
        error: "Email and password does not match"
      })
    }
    // create a token
    const token = jwt.sign({_id: user._id,role: user.user_type,email: user.email}, process.env.SECRET)
    // Put token in cookie
    res.cookie("token", token, { expire: new Date() + 100 })
    // Send response to front end
    return res.status(200).json({status:'200',  user: {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      _id: user._id,
      role: user.user_type,
      token
    }})
  })
}

exports.signout = (req, res) => {
  res.clearCookie("token")
  res.status(200).json({status:'200',message: "User signout successfull"})
}

exports.getUser=(req,res)=>{
  User.find((err,docs)=>{
    if(!err){
      res.status(200).json({status:'200',message: "User List",docs})
    }else{
      return res.status(400).send({status:'200',message:'Failed to retrieve the User List: ' + err})
    }
  })
}
exports.userEdit=(req,res)=>{
  const condition={_id:req.params.id};
  User.updateMany(condition,req.body).then((docs)=>{
      if(!docs){
        return res.status(400).send({status:'400',message:"Failed to user Update"}) 
      }
    return res.status(200).send({status:'200',message:'Succesffully Updated User'})
  }).catch((err)=>{
    return res.status(400).send({status:'400',message:'Something wents wrong',err})
  })
}

exports.verifyUser=(req,res)=>{
  if(!req.headers.authorization ||!req.headers.authorization.startsWith('Bearer') || !req.headers.authorization.split(' ')[1]){
    return res.status(422).json({status:'422',message: "Please provide the token"});
    }
    const token=req.headers.authorization.split(' ')[1];
   // console.log(token);
   const decode=jwt.verify(token,process.env.SECRET);
  // console.log(decode._id);
   const _id=decode._id
   User.findById({_id},(err,user)=>{
      if(user){
        return res.status(200).send({status:'200',message:'User authenticated',user})
      }
    return res.status(400).send({status:'400',message:'User not authenticate',err})
   })

}