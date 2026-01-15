const {Request, Response}=require ('express')

const fakeTaskService = require("../services/fake/fake.Task.service");
const { tasks } = require('../services/fake/fakeDb');

//création du controller 
const taskController ={

getAll :(req,res) =>{

     /**
      * récupérer  toutes les tâches
     * @param {Request}req
     * @param {Response}res
     */

    const tasks = fakeTaskService.find()
    //version 1 renvoyer le tqblequ tel quel
     //? res.status(200).json(tasks)
     // = res.send(json,200)


    //version 2 renvoyer un objet avec le total des tâches  + le tableau qd on a bcp de données ont fait cela 
     const dataToSend={
          count :tasks.length,
          tasks  //on peut avoir  task :tasks
     }
     res.status(200).json(dataToSend)


}, 
     

getById:(req,res)=>{
     //les parametres récuperes seront tj sous forme de chaine de caract. 
     // si on veut que notre id soit une nombre il faudra parse soit avec parseInt soit avec le +
     const id = +req.params.id ;
     const task = fakeTaskService.findById(id);
// si pas de tâche récupérée (donc si l'id n'existe pas )
     if(!task){
          res.status(404).json({
               statusCode:404,
               message:'Tâche non trouvée'
          })
     }
     //si une tâche à été récupérée
     res.status(200).json(task);
     
},


getByUser:(req,res)=>{
     const userName=req.params.name;
    /* const tasks =fakeTaskService.findAssignedTo(userName)
     res.status(200).json(tasks)*/

     const tasksToDo=fakeTaskService.findAssignedTo(userName)
     const tasksGiven=fakeTaskService.findGivenBy(userName)
     const dataToSend={
          tasksToDo : tasksToDo,
          tasksGiven : tasksGiven    // OU tasksToDO
                                     // tasksGiven car on a deja un objet en haut pas obligé de faire comme de l autre.
     }

     res.status(200).json(dataToSend)
},

insert:(req,res)=>{
     const taskToAdd=req.body
     const addedTask = fakeTaskService.create(taskToAdd)
     
     res.location =`/api/tasks/${addedTask.id}`;
     res.status(200).json(addedTask)
},

/**
      * récupérer  toutes les tâches 
     * @param {Request}req
     * @param {Response}res
     * 
     */

update:(req,res)=>{
    const id =+req.params.id
    const newTaskInfos =req.body //on les rec dans le body le snvl infos
    //*verifier si la tâche exoste
    const task=fakeTaskService.findById(id)
    if(!task){
     res.status(404).json({statusCode4:404, message: 'la tâche que vous essayez de modifier n\'existe pas '})
    }

    //* si la tâche elle existe, on peut la modif
     const updatedTask = fakeTaskService.update(id,newTaskInfos)
     res.status(200).json(updatedTask)
},

updateStatus :(req,res)=>{
     const id =+req.params.id
     const newStatus =req.body.isDone
     const tasks = fakeTaskService.findById(id)
     if(!tasks){
          res.status(404).json({statusCode: 404, message :'la tâche que vous essayez de modifier n\'existe pas '})

     }

    const updatedTask = fakeTaskService.updateStatus(id,newStatus)
    res.status(200).json(updatedTask)
},

delete :(req,res)=>{
     const id = +req.params.id
     if(fakeTaskService.delete(id)){
          res.sendstatus(204)
     }
    else {

     res.status(404).json({statusCode: 404, message :'Suppression impossible, la tâche n\'existe pas '})
}
}

}





//importable 
module.exports=taskController;