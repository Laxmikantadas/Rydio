const express=require('express')
const router=express.Router()
const {body}=require('express-validator')
const userControllers=require('../controllers/user.controller.js')
const {authUser}=require('../middlewares/auth.middleware.js')
router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name at least 3 charecter'),
    body('password').isLength({min:6}).withMessage('Password at least 6 charecter')
],userControllers.register)


router.post("/login",[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password at least 6 charecter')
],userControllers.loginUser)


router.get("/profile",authUser,userControllers.getUserProfile)
router.get("/logout",authUser,userControllers.userLogout)



module.exports=router