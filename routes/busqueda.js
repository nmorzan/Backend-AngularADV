/*
  ruta: /api/busqueda/
*/
const { Router } = require('express');
const router = Router();
const {buscarAll,getColeccion} = require('../controllers/busqueda');
const { validarJWT} =require('../middlewares/vaidar-jwt')


router.get('/:busqueda',[validarJWT],buscarAll);
router.get('/coleccion/:tabla/:busqueda',[validarJWT],getColeccion);

module.exports = router;