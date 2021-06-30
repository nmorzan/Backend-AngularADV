/*
  Ruta: /api/usuarios
*/
const { check } = require('express-validator')//importo el check del express validator para los campos que son requeridos
const { Router } = require('express');
const { getUser, crearUser, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');

const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/vaidar-jwt');

const router = Router();


//rutas
router.get('/',[validarJWT], getUser)


router.post('/',
    [
      check('nombre','El nombre debe ser cargado').not().isEmpty(),
      check('password','El password debe ser cargado').not().isEmpty(),
      check('email','El email debe ser cargado').isEmail(),
      validarCampos
    ]
    ,crearUser)


router.put('/:id',
      [
        validarJWT,
        check('nombre','El nombre debe ser cargado').not().isEmpty(),
       // check('role','El role debe ser cargado').not().isEmpty(), se quito la opcion de que el role sea una condicion necesaria
       //para actualizar un usuario
        check('email','El email debe ser cargado').isEmail(),
        validarCampos
      ]
      ,actualizarUsuario
);

router.delete('/:id',[validarJWT], borrarUsuario);

module.exports = router;