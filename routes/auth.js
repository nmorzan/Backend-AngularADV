/*
  Router: /api/login
*/
//router
const { Router } = require('express')
const router = Router();
//expres validator
const {check} = require('express-validator')
//controladores
const { login,googleSignIn } =require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

//rutas
router.post('/',
    [
      check('email','El email debe ingresarse de manera correcta').isEmail(),
      check('password', 'El password debe ser ingresado').not().isEmpty(),
      validarCampos
    ]
    ,login
);

router.post('/google',
    [
      check('token','El token de google es obligatorio').not().isEmpty(),
      validarCampos
    ]
    ,googleSignIn
);
module.exports = router;