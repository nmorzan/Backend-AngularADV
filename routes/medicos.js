/*
  Ruta: /api/medicos
*/

const { Router } = require('express');
const router = Router();
const {crearMedico,obtenerMedicos,editarMedico,eliminarMedico,getMedicoById} = require('../controllers/medicos');
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

router.put(
  '/:id',
  [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('hospital','El ID no es de mongo').isMongoId(),
    validarCampos
  ]
  ,editarMedico
);

router.delete('/:id',[validarJWT],eliminarMedico);

router.get('/:id',[],getMedicoById)

module.exports = router;