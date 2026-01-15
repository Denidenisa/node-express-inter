const categoryService = require("../mongo/category.service.js");
const fakeCategoryService = require("../services/fake/fakeCategories.service.js");



const categoryController ={

    getAll : async(req,res)=>{
        try{
            const categories = await categoryService.find()
            res.status(200).json(categories)
        }catch(err){
            console.log(err)
            res.status(500).json({statusCode:500, message:'Erreur avec la DB'})
        }
        
    },

    getById: async(req,res)=>{
         const id = req.params.id
         try {
         const category = await categoryService.findById(id)
         if(!category){
            res.status(404).json({statusCode:404,message:`La catégorie ${id} n\'existe pas`})
         }
         res.status(200).json(category) 

         
         }
         catch(err){
            res.status(500).json ({stausCode:50,message: 'Erreur de la DB'})
         }

         

    },

    insert: async (req,res)=> {
        const categoryToAdd =req.body
//*si il existe deja dans la db,erreur
    try{
        const exist = await categoryService.nameAlerdyExist(categoryToAdd.name)
        if (exist){
            res.status(409).json({statusCode:409,message:`la catégorie ${categoryToAdd.name} existe déjà 😅 !`})

        }

}
    catch(err){
        res.sendStatus(500)

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