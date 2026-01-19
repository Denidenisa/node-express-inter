const authService = require("../mongo/auth.service");

const authController ={


  register :async(req,res)=>{
    try{ // on récupère le body de la requête qui contient les infos de l'utilisateurs
      const userToAdd =req.body
      // verifir si l email n'es pas déjà utilisé
      if (await authService.emailAlreadyExist(userToAdd.email)){
        res.status(409).json( {statusCode: 409, message:'Cet email est déja utilisé'})



      }
      //on tente d ajouter un utilisateur
      const userCreated =await authService.create(userToAdd)
      res.location(`api/user/${userCreated.id}`)
      res.status(201).json({id:userCreated._id, firstname: userCreated.firstname,lastname:userCreated.lastname})

    }catch(err){
      console.log(err);
      
      res.sendStatus(500)
    }
  },
    login:async(req,res)=>{
      try{
        //recup des infos de conx envoyées
        const credentials=req.body
        //essayer de trv l utilisateur qui correspond à ces données 
        const userFound=await authService.findByCredentials(credentials)
        //si pas d'utilisateur trouvé, les infos de connexion ne sont pas bonnes.
        if(!userFound){
          res.status(401).json({statusCode :401, message: 'Les informations de connexion ne sont pas bonnes.'})
        }else{
          res.status(200).json({id:userFound._id,firstname:userFound.firstname,lastname:userFound.lastname})
        }

      }catch(err){
        console.log(err);
      
      res.sendStatus(500)
      }

    }
  }
  module.exports=authController