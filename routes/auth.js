/*
  Router: /api/login
*/
//router
const { Router } = require('express')
const router = Router();
//expres validator
const {check} = require('express-validator')
//controladores
const { login,googleSignIn,renewToken } =require('../controllers/auth');
const { validarJWT } = require('../middlewares/vaidar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

//rutas

//login comun
router.post('/',
    [
      check('email','El email debe ingresarse de manera correcta').isEmail(),
      check('password', 'El password debe ser ingresado').not().isEmpty(),
      validarCampos
    ]
    ,login
);
//login con google
router.post('/google',
    [
      check('token','El token de google es obligatorio').not().isEmpty(),
      validarCampos
    ]
    ,googleSignIn
);

//refresh token de usuario
router.get('/renew',
    [
      validarJWT
    ],
    renewToken);

module.exports = router;