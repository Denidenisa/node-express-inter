const categoryController=require("../controllers/category.controller");
const bodyValidatorMiddleware = require("../middlewares/bodyValidator");
const idValidatorMiddleware = require("../middlewares/idValidator.middleware");
const nameValidatorMiddleware = require("../middlewares/nameValidator.middleware");

const categoryRouter = require("express").Router ();

categoryRouter.get('/',categoryController.getAll)

categoryRouter.get('/:id',idValidatorMiddleware(),categoryController.getById)

categoryRouter.post('/',bodyValidatorMiddleware(),categoryController.insert)

categoryRouter.put('/:id',idValidatorMiddleware(),bodyValidatorMiddleware(),categoryController.update)

categoryRouter.delete('/:id',idValidatorMiddleware(),categoryController.delete)


module.exports= categoryRouter; //permet de rendre exportable categoryRouter