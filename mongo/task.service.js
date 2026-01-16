const { Task } = require("../controllers/task.model")

const taskService={


  find:async()=>{
      
    },
  
    findById : async(id)=>{
     
  
    },
  
    create:async(task)=>{
      try{
       
      const taskToAdd= new Task(task)
      
      await taskToAdd.save()
      return taskToAdd
  
      } catch (err) {
        console.log(err)
        throw new Error(err)
  
      }
      
    },
    
    update:async(id,task)=>{
      try{

      }
      catch(err){
        console.log(err)
        throw new Error(err)

      }

    },
  
    nameAlerdyExist:async(name)=>{
      try{
        
      
  
      }
      catch(err){
        console.log(err)
        throw new Error(err)
  
      }
    }
  
  }
  
  module.exports=taskService



