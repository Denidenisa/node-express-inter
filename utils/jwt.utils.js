//import de la librairie jsonwebtoken
const jwt = require('jsonwebtoken')


//creation d'un objet dans lequel il y auara 2 fonctions; 
//-une qui premet de créer un token à partir de certaines infos.
//une qui permet de décoder un token et récupérer les infos contenues dedans.

const { jwt_ISSUER, jwt_AUDIENCE, jwt_SECRET } = process.env  //récuperé" et l'ecrire de la même façon que dans le fichier .env

const jwUtils = {
  generate: (user) => {
    //création du token peut planter donc on va renvoyer une promesse pour savoir si ça échoué ou pas.
    return new Promise((resolve, reject) => {
      //? 1) on va créer un "playload" avec certaines données du user.
      //*un playload c'est un objet contenant les informations qu'on veut cacher dans notre token (on évite d'y mettre des informations sensibles, comme email, password,adresse etc ).
      //* les claims, sont les données qu'on met dans notre playload.

      const playload = {
        id: user._id, //id est un claims du playload (aussi _ c'est pour récuperer).
        role: user.role
      }

      //? 2) paramétrer les options pour créer notre token.
      const options = {
        //*choix de l'alg de hashage du token, par défaut HS256.
        algorithm: 'HS512',
        //* choix de la date d'expiration
        expiresIn: '3d',
        //*information sur " à qui " est destiné le token .            
        audience: jwt_AUDIENCE,
        //*information sur " qui " envoie le token ( notre API).
        issuer: jwt_ISSUER
      }

      //? 3)
      //* Pour créer le token la méthode a besoin de :
      //* playload (les informatopns à stocker dans le token).
      //* un secret : le code secret qui nous servir à signer (à encoder) le jeton et à décoder et mis sur git sinon, n'importe qui peut le décoder votre token.
      //* les options : la façon dont va être encodé le token.

      //* le dernier paramètre de la méthode sign est la fonction exécutée à l afin de la création du token.
      jwt.sign(playload, jwt_SECRET, options, (error, token) => {
        //*si il y a eu une erreur lors de la signature, le param error sera rempli et token est rempli.
        if (error) {
          reject(error)//si error, on rejette la promesse
        }

        //* si tout s'est bien passée, error est vide et token est rempli.
        resolve(token) //si pas d'erreur, on résout la promesse et on renvoie le token. 
      })




    })
  },
  //on return token

  decode: (token) => {
    return new Promise((resolve, reject) => {
      //*1) si rien dans paramètre token, promesse non tenue.
      if (!token) {
        reject(new Error('Pas de token reçu 😅'))
      }

      //*2) si y'bien un token, on peut s'occuper de le décoder.
      // pour ça on va faire appel a la méthode verify qui prend plusieurs paramètres :
      //* le 1er, c'est le token à décoder.
      //* le 2e, c'est le secret.
      //* le 3e, ce sont les options.
      //* le 4e, c'est la fonctions qui sera lancée à la fin de la vérification  avec comme paramètre erreur et playload.
      const options = {
        audience: jwt_AUDIENCE,
        issuer: jwt_ISSUER
      }
      jwt.verify(token, jwt_SECRET, options, (error, playload) => {
        //* si une erreur est survenue pendant le décodage error est rempli mais pas de playload.
        if (error) {
          reject(error)
        }
        //* si pas d'erreur pendant le décodage, error est vide et le playload est rempli avec les claims qu'on avait mis dans le token. 
        resolve(playload)


      })
    })

  }

}
module.exports = jwUtils