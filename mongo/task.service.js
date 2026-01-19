const  Task  = require("../models/task.model")
const { findAssignedTo } = require("../services/fake/fake.Task.service")

const taskService={


  find:async()=>{
    try{   //*😀
      //Poupulate permet de rajouter les ifos reliés à notre objet task grâce à la ref qu'on a établi dans le schema 
        const tasks = await Task.find()
                    .populate({path:'categoryId',
                              select:{id:1, name:1,icon:1}
                    }).populate({ path:'fromUserId',
                                  select:{id:1,firstname:1, lastname:1}
                    }).populate({ path:'fromUserId',
                                  select:{id:1,firstname:1, lastname:1}
                    })
        return tasks
      }catch(err){
        console.log(err)
        throw new Error (err)
      }
     
      
    },
  
    findById : async(id)=>{    //*😀
      try{
        const task=await Task.findById(id)//*on peut utiliser findOne({id})
              .populate({path:'categoryId',
                        select:{id:1,firstname:1,lastname:1,},

              })
              .populate({path:'fromUserId',
                select:{id:1,firstname:1,lastname:1,},
              })
              .populate({path: 'toUserId',
                select:{id:1,firstname:1,lastname:1,}
              })
        return task

      }catch(err){
        console.log(err)
        throw new Error (err)
      }
     
  
    },
    findAssignedTo:async(userId)=>{
      try{
        //trouver toutes les tâches assignées qu userId reçu en paramètre
        const tasks=await Task.find({toUserId:userId})
        return tasks

      }catch(err){
        console.log(err)
        throw new Error (err)
      }
    },
    findGivenBy:async(userId)=>{
      try{
        //trouver toutes les tâches donnée par le   userId reçu en paramètre
        const tasks=await Task.find({fromUserId:userId})
        return tasks

      }catch(err){
        console.log(err)
        throw new Error (err)
      }
    },
  
    create:async(task)=>{
      try{
       //créer un nouvel objet à partir du model.
      const taskToAdd= new Task(task)
      //sauvgarde cer objet en db
      await taskToAdd.save()
      //renvoyer l'objet crée                //*😀
      return taskToAdd
  
      } catch (err) {
        console.log(err)
        throw new Error(err)
  
      }
      
    },
    uptadeStatus:async(id,satus)=>{

    },
    
    update:async(id,task)=>{
      try{

      }
      catch(err){
        console.log(err)
        throw new Error(err)

      }

    },
    delte:async(id)=>{ 
      try{ 
        const deletedTask=await Task.findByIdAndDelete(id)
        if(deletedTask){
          return true

        }else{

          return false
        }

      }catch(err){
        console.log(err)
          throw new Error(err)

      }
    }
  }
  
  module.exports=taskService





  //*delete solution 1
    //   try{
    //     const deleteInfo =await Task.deleteOne({_id:id})
         // if(delteInfo.delteCount === 0){
        //   return false
        // }else{
        //   return true
    //     return deleteInfo.deleteCount !== 0
        
  

    // }catch(err){
    //   console.log(err)
    //   throw new Error(err)

    // }
  


    // },   

  
    // nameAlerdyExist:async(name)=>{
    //   try{
    //     const searchedTask=await Task.findOne({name:name})
    //     if(searchedTask){
    //       return true
    //     }else{
    //       return false
    //     } 
        
      
  
    //   }
    //   catch(err){
    //     console.log(err)
    //     throw new Error(err)
  
    //   }
    // }
  
  



