/*
  Ruta: /api/medicos
*/

const { Router } = require('express');
const router = Router();
const {crearMedico,obtenerMedicos,editarMedico,eliminarMedico} = require('../controllers/medicos');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/vaidar-jwt');
const { validarCampos } = require('../middlewares/validar-campos')

router.post(
  '/',
  [ validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('hospital','El ID no es de mongo').isMongoId(),
    validarCampos
  ],
  crearMedico
);
router.get('/',[],obtenerMedicos);

router.put('/:id',[],editarMedico);
router.delete('/:id',[],eliminarMedico);


module.exports = router;