const { tasks } = require("./fakeDb")

const fakeTaskService = {
//*récuperer toutes kes taches de nos "db"
    find :()=>{
        return tasks;

    },
    findById:(id)=>{
        return tasks.find(task =>task.id === id )
    },

    findAssignedTo:(userName)=>{
        return tasks.filter(task=>task.to===userName)

    },
    findGivenBy:(userName)=>{
        return tasks.filter(task=>task.by===userName)

    },

    create : (taskToAdd)=>{
        //en db cv etre auto pour czlculer l id 

        let idMax
        if(tasks.length!=0){
            idMax=Math.max(...tasks.map(task=>task.id))

           
        }else {
            idMax =0

        }
        
        taskToAdd.id=idMax+1
        taskToAdd.isDone =false 


        tasks.push(taskToAdd)

        //on renvoie la nvl tâche 
        return taskToAdd;


    },

    
    updateStatus : (id,status)=>{
        //*on cherche la bonne tâche
        const tasksToUpdate =tasks .find (tasks =>tasks.id===id)
        //*on modifie son état
        tasksToUpdate.isDone=status
        //*on renvoie la tâche modifiée
        return tasksToUpdate
    },
    //va modifier l integralité d une tache
    update : (id,task) => {
        //trouver tache pour mod
        const taskToUpdate =tasks.find(task=>task.id===id)
        //faire la modif
        taskToUpdate.name=task.name
        taskToUpdate.category=task.category
        taskToUpdate.before=task.before
        taskToUpdate.by=task.by
        taskToUpdate.to =task.to
        
        return taskToUpdate

    },
    delete : (id)=>{
        //op1: chercher l indice de l'el a sup
        const index = tasks.findIndex(task=>task.id===id)
        //chercher si l id n existe pa sl index=-1 
        if(index === -1){
            return false //on va renvoyer faux pour indiquer que la suppression  ne s'est pas faite.

            //si l indexte  n'est pas -1 on peut faire la suppression
         
        }
           tasks.splice(index, 1)
            return true // on renvoie true pour indiquer que la suprpession s'est faite correctement

    }

//les constantes const on ne peut pas les modifier 
}
module.exports=fakeTaskService