const express = require('express');//importtqtion de la lib express

const server =express();//création du serveur express



//?récupération des variables d'environnement
const { PORT }=process.env

server.use(express.json()); //pour paramétrer le fait que notre API doit comprendre quand json arrive.
//a chaque nouvelle API on doit metttre ça.


//* utilisiation d un middleware on a fait 

const logMiddleware = require('./middlewares/log.middleware');
server.use(logMiddleware)


const router =require('./routes'); //import de cet objet routers qui se trouve dans index.js

server.use('/api',router); //indiquer==>server utiliser le router 


server.listen(PORT,()=>{
    console.log (`Express server started on port ${PORT}`)
});