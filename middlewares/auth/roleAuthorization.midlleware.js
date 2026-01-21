const User=require('../../models/user.model')

//? Middleware pour vérifier si l'utilisateur qui fait la requête possède au moins des rôles autorisés reçus en paramètre.

//note:le paramètre roles, sera un tableau avec tous les rôles autorisés.

const roleAuthorizationMiddleware =()=>{
  return async (req,res,next)=>{
    //* 1) récupérer l'id de l'utilisateur qui fait la requête.
    const userId=req.user.id

    //* 2) on cherche cet utilisateur dans la db pour avoir accès à son rôle.
    try{
       const UserInDb =await User.findById(userId)
        
       //* sipas de user trouvé avec cet id

       if(!UserInDb){
        res.status(404).json({statusCode:404, message: 'Vous n\'existez pas dans la DB, dommage 🫣'})
       }
       else{
        //* 3) 
        if(roles.includes(UserInDb.role)){
          next()
          
        }
        else{
          res.status(403).json({statusCode:404, message: 'Vous n\'avez  pas les droits d\'accès sur cette ressource 🫢'})
        }

       }



    }catch(err){
      console.log(err)
        res.status(500).json({ statusCode : 500, message : "Une erreur est survenu à la DB 🌐"})

    }

  }

}
module.exports= roleAuthorizationMiddleware