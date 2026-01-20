const offensivesWords = [ "trump","macron","vladmir putin","netanyahu" ]

const bodyValidatorMiddleware = () => {

    return (req, res, next) => {
        //Si par mégarde pas de body, on continue 
        if(!req.body){
            next();
        }

        //S'il y a un body, on va aller chercher toutes les propriétés contenues dedans
        const fields = Object.keys(req.body);

        // Pour chaque propriété du body
        for(let field of fields) {
            console.log(field);

            const valueInField = req.body[field];
            // si le type de la valeur contenue dans le champs est bien une chaine 
            if(typeof valueInField  === 'string')
            {
                //on va vérifier s'il y a un mot offensant dedans
                if(offensivesWords.some(word => valueInField.toLowerCase().includes(word))) {
                    res.status(400).json( { statusCode : 400, message : `Vous ne pouvez pas mettre n'importe quoi dans ${field} 😤` } );
                    // ? Je crois que si je mets un res.status().json() dans une boucle, la requête ne prend pas fin et que le programme veut finir sa boucle. Si je le force à sortir de la boucle avec un return, là ça marche
                    return; 
                }
            }
            
        }

        next();

    }
}

module.exports = bodyValidatorMiddleware;