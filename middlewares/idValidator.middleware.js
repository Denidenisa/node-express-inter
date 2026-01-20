

const {Request, Response } = require("express")
const idValidatorMiddleware=()=>{


    /**
     * @param{Request} req
     * @param{Response} res
     */
     return (req,res, next ) => {
        const id = +req.params.id//recupere l id dans la requete
        if (isNaN(id)){

            //si pas un nb ==> stop la requete
            res.status(400).json({statusCode:400, message:'L\'id doit être un nombre entier 😌' })

        }
        //si c ets un nombre, on continue la requqete
        next()



     }

}
module.exports=idValidatorMiddleware