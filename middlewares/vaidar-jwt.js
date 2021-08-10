const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')
const validarJWT = (req,res,next) =>{

  //Leer token del header
  const token = req.header("x-token");

  //veo si hay token
  if(!token){
    return res.status(404).json({
      ok:false,
      msg:"No existe ningun token"
    });
  }

  try{
    //verificamos el token
    const {id} =jwt.verify(token, process.env.JWT_TOKEN);
    req.id = id;
    next();

  }catch(err){
    res.status(500).json({
      ok:false,
      msg: "El token es invalido"
    })
  }
}

const validarADMIN_ROLE = async(req, res, next)=>{
  const id = req.id;
  try {
    const userLog = await Usuario.findById(id);
    if(!userLog){
      return res.status(400).json({
        ok:false,
        msg:"Error, ese usuario no existe"
      })
    }

    if(userLog.role !== "ADMIN_ROLE"){
      return res.status(400).json({
        ok:false,
        msg:"Error, no tiene privilegios de hacer esto"
      })
    }

    next()

  } catch (error) {
    return res.status(500).json({
      ok:false,
      msg:"Error, hable con el administrador"
    })
  }
}

const validarADMIN_ROLE_o_Mismo_usuario = async(req, res, next)=>{
  const id = req.id;
  const id_user = req.params.id;
  try {
    const userLog = await Usuario.findById(id);
    if(!userLog){
      return res.status(400).json({
        ok:false,
        msg:"Error, ese usuario no existe"
      })
    }

    if(userLog.role === "ADMIN_ROLE" || id_user === id){
      next()
    }else{
      return res.status(400).json({
        ok:false,
        msg:"Error, no tiene privilegios de hacer esto"
      })
    }



  } catch (error) {
    return res.status(500).json({
      ok:false,
      msg:"Error, hable con el administrador"
    })
  }
}


module.exports={
  validarJWT,
  validarADMIN_ROLE,
  validarADMIN_ROLE_o_Mismo_usuario
}