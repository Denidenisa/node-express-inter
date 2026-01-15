const categoryController=require("../controllers/category.controller");
const idValidatorMiddleware = require("../middlewares/idValidator.middleware");
const nameValidatorMiddleware = require("../middlewares/nameValidator.middleware");

const categoryRouter = require("express").Router ();

categoryRouter.get('/',categoryController.getAll)

categoryRouter.get('/:id',idValidatorMiddleware(),categoryController.getById)

categoryRouter.post('/',nameValidatorMiddleware(),categoryController.insert)

categoryRouter.put('/:id',idValidatorMiddleware(),nameValidatorMiddleware(),categoryController.update)

categoryRouter.delete('/:id',idValidatorMiddleware(),categoryController.delete)


module.exports= categoryRouter; //permet de rendre exportable categoryRouter