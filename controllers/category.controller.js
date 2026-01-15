const fakeCategoryService = require("../services/fake/fakeCategories.service.js");
const { getById, update } = require("./task.controller");

const categoryController ={

    getAll : (req,res)=>{
        const categories = fakeCategoryService.find ();

        res.status(200).json(categories)

    },

    getById: (req,res)=>{
         const id = +req.params.id
         const category = fakeCategoryService.findById(id)

         if(!category){
            res.status(404).json({statusCode:404,message:`La catégorie ${id} n\'existe pas`})
         }

         res.status(200).json(category)

    },

    insert: (req,res)=> {
        const categoryToAdd =req.body
//*si il existe deja dans la db,erreur
        if (fakeCategoryService.nameAlerdyExist(categoryToAdd.name)){
            res.status(409).json({statusCode:409,message:`la catégorie ${categoryToAdd.name} existe déjà !`})

        }
      //*si non 
       const insertedCategory= fakeCategoryService.create(categoryToAdd)
       
       res.location(`/api/categories/${insertedCategory.id}`)
       res.status(201).json(insertedCategory)

    },

    update: (req,res)=>{
        res.sendStatus(501)
    },

    delete: (req,res)=>{
        res.sendStatus(501)
    },
}

module.exports=categoryController





/** zn haut  dans getAll const categories = fakeCategoryService.find();
       //const dataToSend ={
       //count:categories.length,categories
       //}
       res.status(200).json(categories)//(dataToSend) */