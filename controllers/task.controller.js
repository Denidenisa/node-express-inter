const {Request, Response}=require ('express')

const fakeTaskService = require("../services/fake/fake.Task.service");
const  taskService  = require('../mongo/task.service');

//création du controller 
const taskController ={
/**
      * récupérer  toutes les tâches
     * @param {Request}req
     * @param {Response}res
     */
getAll :async(req,res) =>{    
     const query =req.query
     //*console.log(query)  quary,même si y'en a pas,sera toujours un objet vide     //*😀

    try{
     const tasks=await taskService.find(query)
     const dataToSend={
          count:tasks.lenght,
          tasks
     }
      res.status(200).json(dataToSend)

    }catch(err){
     console.log(err)
     res.status(500).json({statusCode:500, message:'Erreur avec la DB 🌐'})

    }

    /*const tasks = fakeTaskService.find()
    //version 1 renvoyer le tqblequ tel quel
     // res.status(200).json(tasks)
     // = res.send(json,200)


    //version 2 renvoyer un objet avec le total des tâches  + le tableau qd on a bcp de données ont fait cela 
     const dataToSend={
          count :tasks.length,
          tasks  //on peut avoir  task :tasks
     }
     res.status(200).json(dataToSend)*/


}, 
    /**
      * récupérer  toutes les tâches
     * @param {Request}req
     * @param {Response}res
     */ 

getById:async (req,res)=>{
     
     try{
          const id = req.params.id
          const task=await taskService.findbyId(id)
          if(!task){
               res.status(404).json({statusCode:404,message:`La tâche ${id} n\'existe pas 😓`})
          }res.status(200).json
     }catch(err){
            res.status(500).json ({statusCode:500,message: 'Erreur de la DB🌐'})

     }
     //les parametres récuperes seront tj sous forme de chaine de caract. 
     // si on veut que notre id soit une nombre il faudra parse soit avec parseInt soit avec le +
     //const id = +req.params.id ;
     //const task = fakeTaskService.findById(id);
// si pas de tâche récupérée (donc si l'id n'existe pas )
    // if(!task){
          //res.status(404).json({
              // statusCode:404,
              // message:'Tâche non trouvée'
         // })
    // }
     //si une tâche à été récupérée
    // res.status(200).json(task);
     
},


/**
    * Récupérer les tâches d'un user
    * @param { Request } req
    * @param { Response } res
    */
getByUser: async (req, res) => {
     try {

         const userId = req.params.id;
       

         const tasksToDo = await taskService.findAssignedTo(userId);
         const tasksGiven = await taskService.findGivenBy(userId);

         const dataToSend = {
             tasksToDo,
             tasksGiven
         }

         res.status(200).json(dataToSend);
     }
     catch (err) {
         res.status(500).json({ statusCode: 500, message: 'Erreur de la db' });
     }

 },

 /**
      * récupérer  toutes les tâches
     * @param {Request}req
     * @param {Response}res
     */
 insert: async (req, res) => {  //*😀

     const taskToAdd = req.body;

     try {
         const addedTask = await taskService.create(taskToAdd);
         // Pour respecter les principes REST, on doit rajouter à la réponse, une url qui permet de consulter la valeur ajoutée
         res.location(`/api/tasks/${addedTask.id}`);
         res.status(201).json(addedTask);

     }
     catch (err) {
         res.status(500).json({ statusCode: 500, message: 'Erreur lors de l\'ajout dans la DB' })
     }

 },

/**
      * récupérer  toutes les tâches 
     * @param {Request}req
     * @param {Response}res
     * 
     */

update:(req,res)=>{
    const id =+req.params.id
    const newTaskInfos =req.body.isDone//on les rec dans le body le snvl infos
    //*verifier si la tâche exoste
    const task=fakeTaskService.findById(id)
    if(!task){
     res.status(404).json({statusCode4:404, message: 'la tâche que vous essayez de modifier n\'existe pas '})
    }

    //* si la tâche elle existe, on peut la modif
     const updatedTask = fakeTaskService.update(id,newTaskInfos)
     res.status(200).json(updatedTask)
},
/**
    * Modifie le statut isDone d'une tâche
    * @param { Request } req
    * @param { Response } res
    */

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
 /**
    * Supprime une tâche
    * @param { Request } req
    * @param { Response } res
    */

delete :async(req,res)=>{

     try{ 
          const id = req.params.id
          if(taskService.delete(id)){
                 res.sendstatus(204)
                    }
                   else {
               
                    res.status(404).json({statusCode: 404, message :'Suppression impossible, la tâche n\'existe pas '})
               }
                
     }catch(err){
          console.log(err)
          throw new Error(err)


     }
//      const id = +req.params.id
//      if(fakeTaskService.delete(id)){
//           res.sendstatus(204)
//      }
//     else {

//      res.status(404).json({statusCode: 404, message :'Suppression impossible, la tâche n\'existe pas '})
// }
 }

 }

//importable 
module.exports=taskController;

