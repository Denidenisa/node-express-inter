const express = require('express');//importtqtion de la lib express

const server =express();//création du serveur express



//?récupération des variables d'environnement
const { PORT,DB_CONNECTION}=process.env
server.use(express.json()); //pour paramétrer le fait que notre API doit comprendre quand json arrive.
//a chaque nouvelle API on doit metttre ça.


//* utilisiation d un middleware on a fait 

const logMiddleware = require('./middlewares/log.middleware');
server.use(logMiddleware())

//*connection à la DB, créer un middleware qui établit  un connection à chaque rêquete
const mongoose = require('mongoose')
server.use(async(req, res,next)=>{

    try{
        await mongoose.connect(DB_CONNECTION) //!voir code aude
        console.log("Successfully  connected to the DB")
        next()
        
        
        

    }catch(err){
        console.log(`Connection Failed\n[Reason]\n${err}`)
        res.status(500).json({statusCode:500, message : 'Impossible de se connevcter à la base de donnée !'})

    }
    
})
const router =require('./routes'); //import de cet objet routers qui se trouve dans index.js
server.use('/api',router); //indiquer==>server utiliser le router 


server.listen(PORT,()=>{
    console.log (`Express server started on port ${PORT}`)
});