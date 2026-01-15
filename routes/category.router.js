const categoryController=require("../controllers/category.controller");
const bodyValidatorMiddleware = require("../middlewares/bodyValidator");


const categoryRouter = require("express").Router ();

categoryRouter.get('/',categoryController.getAll)

categoryRouter.get('/:id',categoryController.getById)

categoryRouter.post('/',categoryController.insert)

categoryRouter.put('/:id',bodyValidatorMiddleware(),categoryController.update)

categoryRouter.delete('/:id',categoryController.delete)


module.exports= categoryRouter; //permet de rendre exportable categoryRouter