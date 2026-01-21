const categoryController=require("../controllers/category.controller");
const authentificaionMiddleware = require("../middlewares/auth/authentification.middleware");
const roleAuthorizationMiddleware = require("../middlewares/auth/roleAuthorization.midlleware");
const bodyValidatorMiddleware = require("../middlewares/bodyValidator");


const categoryRouter = require("express").Router ();

categoryRouter.get('/',categoryController.getAll)

categoryRouter.get('/:id',categoryController.getById)

categoryRouter.post('/',authentificaionMiddleware(),
                        roleAuthorizationMiddleware(['Admin']),
                        bodyValidatorMiddleware(),
                        categoryController.insert)

categoryRouter.put('/:id',authentificaionMiddleware(),
                          roleAuthorizationMiddleware(['Admin']),
                          bodyValidatorMiddleware(),
                          categoryController.update)

categoryRouter.delete('/:id',authentificaionMiddleware(),
                              roleAuthorizationMiddleware(['Admin']),
                              categoryController.delete)


module.exports= categoryRouter; //permet de rendre exportable categoryRouter