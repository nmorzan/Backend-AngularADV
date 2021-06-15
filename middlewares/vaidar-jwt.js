const jwt = require('jsonwebtoken')

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

module.exports={
  validarJWT
}