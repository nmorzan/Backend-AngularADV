const  Usuario  = require('../models/usuario');

const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

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
      });
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


const googleSignIn= async(req,res)=>{
  const googleToken = req.body.token;
  let usuario;
  try{
      const {name, email, picture} = await googleVerify(googleToken);

      //busco el usuario con el mail
      const usuarioDB = await Usuario.findOne({email});

     if(!usuarioDB){
        //si el usuario no esta creado lo creo
          usuario = new Usuario({
          nombre: name,
          email: email,
          img: picture,
          password: '@@@',
          google: true
        });
      }else{
        //si esta creado actualizo google
        usuario = usuarioDB;
        usuario.google=true
      }

      //guardo el usuario nuevo o actualizo el que esta
      await usuario.save()

      //genero el token de acceso con Google id porq la contraseña se la asigne arriba 
      //(si no le asigno nada a la contraseña tendra doble acceso)

          //generar token de validadcion
    const token = await generarJWT(usuario._id);
      
      res.status(200).json({
      ok:true,
      usuario,
      token
    });

  }catch(error){
    res.status(401).json({
    ok:false,
    msg:"El token no es valido"
    });
  }
} 

const renewToken = async(req,res)=>{
  const id = req.id;
  
  try{
    const token = await generarJWT(id);

    const usuario = await Usuario.findById(id);
    res.status(200).json({
      ok:true,
      token,
      usuario
    });
  }catch(error){
    res.status(500).json({
      ok:false,
      msg:"Algo salio mal"
    })
  }
}




module.exports ={
  login,
  googleSignIn,
  renewToken
}