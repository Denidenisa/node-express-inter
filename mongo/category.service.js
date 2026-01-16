
const Category = require("../models/category.model")
const categoryService={
  /*Creation de notre "vraie"service, ce sont les mêmes fonct que notr fakeService=>meme fonct*/
  find:async()=>{
    try{
      //*interoger la db
      const categories =await Category.find()
      return categories

    }
    
    catch(err) {
      console.log(err)
      throw new Error(err)
    }

  },

  findById : async(id)=>{
    try{
      const searchedCategory= await Category.findById(id)
      return searchedCategory;

    }
    catch { console.log(err)
      throw new Error(err)

    }

  },

  create: async (category) => {
    try {

        // Dans category il y a des informations contenues dans le body
        // On va créer l'objet à ajouter à partir du model qu'on a créé
        const categoryToAdd = Category(category);
        // On va "sauvegarder" (c'est à dire insérer) notre category dans la db
        await categoryToAdd.save();
        // Si tout s'est bien passé, on renvoie la category créée
        return categoryToAdd;

    } catch (err) {

        console.log(err);
        throw new Error(err);
    }


},


  nameAlerdyExist:async(name)=>{
    try{
      const searchedCategory=await Category.findOne({name:name})//findOne({name:name})
    if(searchedCategory){

      //*si une cat a ete trv c est que le  nom existait deja donc on retrouve vrai
      return true
    } else{
      //*si aucune cat n a ete trv c est que le nom n existat pas donc on renvoie faux 
      return false

    }
    

    }
    catch(err){
      console.log(err)
      throw new Error(err)

    }
  }

}

module.exports=categoryService