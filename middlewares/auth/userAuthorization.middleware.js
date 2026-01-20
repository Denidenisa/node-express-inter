//? 
const User = require("../../models/user.model");
const userAuthorizationMiddleware=()=>{
  return async(req,res,next)=>{
    //* 1) vérifier si l'id du token stocké dans la requête est identique à l'id dans la route de la requête pour voir si on a le droit d'accéder à la ressource.
    const userRouterId=req.params.id
    console.log("userRouterId"+userRouterId)
    //* 2)récupérer l'id se trouvant dans le token et qui a été ajouté dans la requête.
    const userId=req.user.id
    console.log('userId'+userId)
    //* 3) récupérer le role de l'utilisateur qui fait la requête puisque si'il est admin, il a tous les doits
    // 2 options 
    //* soit on le récupére dans la requête puisqu'il était dans le token.
    //* incovénent :  
    //* soit o fait une requête vers la DB pour avoir son rôle à cet instant précis.
    try {
      const tokenUser = await User.findById(userId);

      if (!tokenUser) {
          res.status(404).json({ statusCode: 404, message : 'Vous n\'existez plus dommage 😱😝'})
         
      } else {

          if (tokenUser.role === 'Admin') {
              next();
          }else if(userId === userRouterId){
              next();

          }else {
              res.status(403).json({ statusCode : 403, message : 'Vous n\'avaez pas les droits pour accéder à ces données 😓'})
          }
      }
     
  } catch (err) {
      res.status(500).json({ statusCode : 500, message : "Une erreur est survenu à la DB 🌐"})
     
  }

    }

  }

  

module.exports =userAuthorizationMiddleware;