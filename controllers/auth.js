const  UsuarioSchema  = require('../models/usuario');
const Usuario = UsuarioSchema;

const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async(req,res)=>{
  const { password, email} = req.body;

  try{
    const loginUser = await Usuario.findOne({email: email});

    //Control de email de usuario
    if(!loginUser){
      res.status(404).json({
        ok:false,
        msg:"No se ha encontrado el email"
      });
    }

    //control de contraseña
    const validPassword = bcrypt.compareSync(password, loginUser.password);
    if(!validPassword){
      res.status(404).json({
        ok:false,
        msg:"Contraseña incorrecta"
      })
    }


    //generar token de validadcion
    const token = await generarJWT(loginUser._id);

    res.status(200).json({
      ok:true,
      token
    });

  }catch(error){
    console.log(error);
    res.status(500).json({
      ok:false,
      msg:"Comuniquese con su administrador"
    });
  }
}

module.exports ={
  login
}