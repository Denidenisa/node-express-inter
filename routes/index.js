

//! creer un objer "router"
const tasksRouter = require('./task.router');
const categoryRouter=require('./category.router');
const authRouter = require('./auth.router');

const router = require('express').Router();


router.get('/', (req, res) => {
    res.send('🤗 Bienvenue sur notre API de gestion de tâches 📄',200);
});



router.use('/tasks',tasksRouter);


router.use('/categories',categoryRouter);


router.use('/auth',authRouter);


//rendre exportable notre objet router
module.exports = router;