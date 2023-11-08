const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const {getDogs}=require('../controllers/getDogs');
const {getDogById} = require ('../controllers/getDogById');
const {getDogByName} = require ('../controllers/getDogByName');
const {getTemperaments} = require ('../controllers/getTemperaments');
const {createDog} = require ('../controllers/createDog');
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.post('/create', createDog);

router.get('/temperaments', getTemperaments);

router.get('/dogs',getDogs);

router.get('/dogs/name', getDogByName);

router.get('/dogs/:raza', getDogById);
router.post('/create', createDog);

module.exports = router;
