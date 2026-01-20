
const taskController=require('../controllers/task.controller');
const bodyValidatorMiddleware = require('../middlewares/bodyValidator');
const authentificaionMiddleware=require('../middlewares/auth/authentification.middleware');
const userAuthorizationMiddleware=require('../middlewares/auth/userAuthorization.middleware');



const tasksRouter=require('express').Router();

tasksRouter.route('/')
    .get(taskController.getAll)
    .post(authentificaionMiddleware(),bodyValidatorMiddleware(),taskController.insert)
    

tasksRouter.route('/:id')
    .get(taskController.getById)
    .put(bodyValidatorMiddleware(),taskController.update)
    .delete(taskController.delete)
    .patch(bodyValidatorMiddleware(),taskController.updateStatus)
tasksRouter.get('/user/:id',authentificaionMiddleware(),userAuthorizationMiddleware(),taskController.getByUser)


module.exports = tasksRouter;

/*tasksRouter.get('/',(req, res)=>{
    res.send('Voici toutes les tâches', 200)
})*/


/*tasksRouter.post('/',(req,res)=>{
   const taskToInsert = req.body;
    res.send(taskToInsert, 201);//201 pour dire que la ressource  a ete cree avec succes.
})*/


/*tasksRouter.get('/:id', (req,res)=>{
    const id = req.params.id
    res.send(`voici la tâche numero ${id}`)
})*/

/*tasksRouter.put('/:id',(req,res)=>{
    const taskId =req.params.id; //id de la tache tj recupere dans les pramettres 
    const taskUpdated=req.body; // nouvelle modification donc la tache va se retrouver dans le body de la requete.
    taskUpdated.id=taskId;
    res.send(taskUpdated, 200); //send env plusieurs choses a la fois -->quand on veut envoyer une donné et un statuscode 

})*/

/*tasksRouter.delete('/:id',(req,res)=>{
    //res.sendStatus -->envoyer juste un statuscode
    res.sendStatus(204);//204 no content --succès dans rien de particulier à renvoyer.

})*/

/*tasksRouter.get('/user/:name',(req,res)=>{
    res.send(`Voici les tâches de ${req.params.name}`,200);

})*/

/*tasksRouter.patch('/:id',(req,res)=>{

    const UpdatedTask ={
         id : req.params.id,
         isDone:req.body.isDone
    }
    res.send(UpdatedTask,200);
})*/



