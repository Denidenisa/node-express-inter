
const {Request, Response }=require("express")
const logMiddleware = ()=>{
    /**
     * @param{Request}req
     * @param{Response}res
     */

    //middl est une fonction qui va renvoyer une requete 
    return (req,res,next)=>{
        //req contient la requete entrente où on ira chercher les infps qui nous interesse
        //res contient la reponse et nous premettra de sttopper la requete si il le faut
        //next est une fonction qu on executera pour permettre à la requete de continuer sa route
        const method = req.method
        //l url de notre requete
        const url = req.url
        const date=new Date()

        
        
        console.log(`${method}  ${url}   ${date.toLocaleDateString()}   ${date.toLocaleTimeString()}`)

        next()//l execution de la fonction next, permettra d indiquer que la requete continue son chemin7
        
    }

}
module.exports =logMiddleware