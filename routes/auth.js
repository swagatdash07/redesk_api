const express = require("express");
const router = express.Router();
const {signupValidation, loginValidation }=require('../middleware/validation');
const {signup,signin,signout,getUser,userEdit,verifyUser} = require("../controllers/auth");
const {createTask,getTask,editTask}=require('../controllers/taskController');
const {createProject,getProject,editProject}=require("../controllers/projectController");
const {createRole,getRole}=require("../controllers/roleController");

//user create
router.post("/signup",signupValidation,signup);
router.post("/signin",loginValidation,signin);
router.get("/signout",signout);
router.get("/userList",getUser);
router.put("/editUser/:id",userEdit);

//task create
router.post("/Task",createTask);
router.get("/taskList",getTask);
router.put("/taskEdit/:id",editTask);

//create project
router.post("/project",createProject);
router.get("/projectList",getProject);
router.put("/projectEdit/:id",editProject)
//create role
router.post("/role",createRole);
router.get("/roleList",getRole);

module.exports = router;
