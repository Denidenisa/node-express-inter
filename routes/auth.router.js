
const authController=require('../controllers/auth.controller')
const authRouter = require('express').Router()

authRouter.post('/login',authController.login)


authRouter.post('/register',authController.register)


module.exports=authRouter;