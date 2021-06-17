/*
 Rutas: ./routes/hospitales
*/
const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/vaidar-jwt')

const {obtenerHospital, crearHospital, editarHospital, borrarHospital} = require('../controllers/hospitales')

router.get('/',[],obtenerHospital);

router.post(
  '/',
  [ validarJWT,
    check('nombre','El nombre del hospital es obligatorio').not().isEmpty(),
    validarCampos
  ],
  crearHospital
);

router.put(
  '/:id',
  [
    validarJWT,
    check('nombre','El nombre del hospital es obligatorio').not().isEmpty(),
    validarCampos
  ],
  editarHospital);


router.delete(
  '/:id',
  [
    validarJWT
  ],
  borrarHospital);



module.exports = router;