const argon2 = require("argon2")
const User = require('../models/user.model')

const authService={

  findByCredentials :async(credentials)=>{
    try{
      //trouver l'utilisateur dont le mail = à celui reçu, si pas d'utilisateur trouvé, on sort 
      const userFound=await User.findOne({email:credentials.email})
      if(!userFound){
        return undefined

      }
        
      //si utilisateur trouvé, on va vérifier si l epwd qu'il a entré correspond à celui hashé dans la db
      const checkPassword =  await argon2.verify(userFound.password, credentials.password)
      // si pas on sort 
      if(!checkPassword){
        return undefined
      // si oui, c'est au'on a le bon mails et le bon pww, on peut renvoyer l'utilisateur
      }else  { 
        return userFound

      }
      
    }catch(err){
      console.log(err)
      throw new Error(err)

    }

  },
  emailAlreadyExist:async(email)=>{
    try{
      const userFound =await User.findOne({email})
      //si un utilisiateur est trv, oui , l'email existe déjà
      if (userFound){
        return true
      }else{
        return false
      }

    }catch(err){  
      console.log(err)
      throw new Error(err)

    }
  },
  create:async(user)=>{
    try{ 
       const hashedPassword = await argon2.hash(user.password)
       user.password =hashedPassword
       const userToCreate =User(user)
       await userToCreate.save()
        return userToCreate

    }catch(err){
      console.log(err)
      throw new Error(err)
    }
    
  }
}
module.exports=authService