// ce middleware va permettre de vérifier si un token a bien été fourni.
//* si oui, on contiue la requête. 
//* si pas de token , on arrête la requête et on met un code d'erreur.
//* --> résultat : il faut être connecté pour accéder bà la ressource.
const { Request } = require('express')
const jwUtils = require('../../utils/jwt.utils')
const authentificaionMiddleware = () => {
  /**
   * @param {Request}req
   */
  return async (req, res, next) => {
    //* le token reçu dans Authorization doit ressembler à 
    //*"Bearer LeTokenIciAvecPleinDeChiffresEtDeLettres".
    //? Récupérer le headers qui s'appelle authorization
    const authorization = req.headers.authorization
    //* si le token n' pas été ajouté dans authorization, on aura undefined et dans ce cas, on met fin à la requête : la personne n'est pas  connectée.
    if (!authorization) {
      res.status(401).json({ statusCode: 401, message: 'Vous devez être connecté' })

    }
    //* si quelqu'un a envoyé quelque chose dans Authorization comme 'Bearer' sans envoyer le token après erreur  Beare: fin d ela requête .
    //* authorization.split('') permet de découper la chaine, là où il y a un espace. 
    //* on obtient donc un tableau avec 2 cases: 
    // //*Dans la 1er [0]  "Baerer".
    // //*dans la 2e [1 le token.
    const token = authorization.split(' ')[1]
    if (!token) {
      res.status(401).json({ statusCode: 401, message: 'Vous devez être connecté 😀' })




    }

    // si il y'a un token
    //*on essaie de le décoder
    try {
      const playload = await jwUtils.decode(token)
      //*on va stocker le playload récupéré dans notre objet req comme ça, on peut savoir à tout moment dans la suite de la requête, qui est l'utilisateur actuellement demandeur de la requête.
      //* pour ajouter une info dans la requête, je prends juste l'objet req et je lui ajout eune nouvelle propriété à l'arrache (c'est magie du js). (Attention juste à ne pas mettre un nom déjà utilisé comme queery,body,url etc)
      req.user = playload
      next()
    } catch (err) {
      console.log(err);
      
      //*si erreur, le décodage a planté, le token n'est plus bon ou erroné, donc fin de la requête.
      res.status(401).json({ statusCode: 401, message: 'Vous devez être connecté 😀' })

    }



  }
}



module.exports = authentificaionMiddleware