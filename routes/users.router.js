const userController=require("../controllers/user.contoller")
const authentificaionMiddleware = require("../middlewares/auth/authentification.middleware");



const userRouter=require("express").Router()

userRouter.route('/')
    .get( authentificaionMiddleware(),
          userController.getAll)

module.exports = userRouter;
