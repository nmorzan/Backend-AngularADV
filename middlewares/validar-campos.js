const { validationResult } = require('express-validator');

const validarCampos = (req, res, next)=> {
  //controlo los errores generados en la validacion y captados por el middleware
  const errores = validationResult(req);

  if(!errores.isEmpty()){
    return res.status(400).json({
      ok:false,
      errors : errores.mapped() //esto es par que se puedan ver bien los errores
    })
  };

  next();

}

module.exports ={validarCampos}