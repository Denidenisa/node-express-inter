const offensiveWords=["trump","macron","vladmir putin","netanyahu"]

const nameValidatorMiddleware=()=>{
    return(req, res,next)=>{
/**si jamais on a mis notre middleware sur une route où y a pas de body, on continue la requete */
        if(!req.body){
            next ()
        }

        /**si jamais on a mis notre middleware sur une requete ou le body ne contient pas de propriete quis apl name */
        if(!req.body.name){
            next ()
        }

            
        const name = req.body.name.toLowerCase()//en miniscule
        for(let word of offensiveWords){
            //si le name inclut le mot,on met fin a la requete
            //*on peut l ecrire cmc aussi 
            //*if (offensiveWords.some(word=>name.includes(word))){
            //*res.status(400).json({stausCode:400, message:'Ca va pas bien ?!?'})
            //*}
            if(name.includes(word)){
                res.status(400).json({stausCode:400, message:'Ca va pas bien ?!?'})

            }
        }
        //si on sort de la boucle c ets uqe notre requete n a pas pris fin donc pas de mots offensant,alors on continue.
        next()

    }
}
module.exports=nameValidatorMiddleware