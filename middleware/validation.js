const { check }=require('express-validator');
exports.signupValidation=[
    check("firstname", "Firstname should be atleast 3 characters").isLength({min: 3}),
    check("lastname", "Lastname should be atleast 3 characters").isLength({min: 3}),
    check("email", "Email should be valid").isEmail(),
    check("password", "Password should be atleast 6 characters").isLength({min: 6})
    
]

exports.loginValidation=[
    check("email", "Email should be valid").isEmail(),
    check("password", "Password should be atleast 6 characters").isLength({min: 6})
]
