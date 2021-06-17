/* Importo modelo de usuario*/
const UsuarioSchema = require('../models/usuario');
const Usuario = UsuarioSchema;
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


/*Controladores de usuarios*/
const getUser= async(req,res)=>{

  //tomo un dato que puede o no venir desde laurl como query (generalmente luego del ?) si no viene le pongo 0
  const desde = Number(req.query.desde) || 0;

  //para hacer una paginacion se debe indicar desde que valor iniciar y cuantos poner, por ejemplo desde= 5 limit = 10
  //seria desde el objeto 5 traeme 10

  /*El codigo desde aqui es ineficiente, ya que tenemos 3 await  de manera consecutiva y significa que va uno luego el otroy asi,
  para solucionar esto se puede usar un arreglo de promesas
  const usuarios = await Usuario.find({},'nombre email role google')
                                .skip(desde)    
                                .limit(5);
  const cantUser = await Usuario.count();
  const user = await Usuario.findById(req.id);*/

  const [usuarios, cantUser, user]= await Promise.all([
    Usuario.find({},'nombre email role google img').skip(desde).limit(10),
    Usuario.countDocuments(),
    Usuario.findById(req.id)
  ]);

  res.json({
    ok:true,
    usuarios,
    Usuario: user.nombre,
    Cantidad: cantUser
  })

}

const crearUser= async (req,res)=>{  //creo una funcion async que me permita esperar coomo una promesa que termine un proceso (await)
  const { email, password} = req.body;

  try{

  //espero que busque el email en la base de datos y verifico que sea unico
    const userEmail = await Usuario.findOne({email});
    if(userEmail){
      return res.status(400).json({
        ok: false,
        msg:'El mail ingresado ya existe'
      })
    }

 //meto dentro del model de usuarios los datos que son enviados en el body a modo de json
    const usuario = new Usuario(req.body);

    //encripto contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

     //creacion del usuario
    await usuario.save(); //espero a que se guarden en la base de datos para continuar

    //generacion del token para el usuario 
    const token= await generarJWT(usuario._id);
    res.json({
      status: "ok",
      usuario,
      token: token
    })
  }catch(error){
    return res.status(500).json({
      ok:false,
      msg:"Ah ocurrido un error, por favor verifique el login"
    })
  }
}


const actualizarUsuario= async(req,res)=>{
  //tomar datos que vienen por la ruta /:id
  const id = req.params.id;

  try{
    //verifico si existe en la base de datos

    const usuarioDB = await Usuario.findById(id);

    if(!usuarioDB){
      return res.status(200).json({
        ok:false,
        msg:"Ese usuario no existe"
      });
    }

    //tomo los datos que el usuario envia y los desestructuro, google y password no se van a leer en la variable campos
    const {google, password,...campos} = req.body;

    //analizo si el email que el usuario mando es igual al del usuario
    if (usuarioDB.email === campos.email){
      delete campos.email;
    }else{
      //si los mails no son iguales, entoces miro en la bdd si es que hay otro igual
      const userEmail = await Usuario.findOne({email: req.body.email});
      if(userEmail){
        return res.status(400).json({
          ok:false,
          msg:"Ese mail ya existe, ingrese otro"
        });
      };
    }

    const usuario = await Usuario.findByIdAndUpdate(id, campos, {new: true});

    res.json({
      ok: true,
      Usuario: usuario
    })
  }catch(error){
      console.log(error);
      res.status(500).json({
      ok:false,
      msg:"Ocurrio un error inesperado",
    })
  }
}


const borrarUsuario = async(req,res)=>{
  //tomo el dato que llega desde la url
  const id = req.params.id;

  try{

    //analizo si hay un usuario con ese id
    const userExist = await Usuario.findById(id);
    if(!userExist){
      return res.status(404).json({
        ok:false,
        msg:"Ese usuario no existe"
      })
    }


    //busco el usuario y lo elimino
    const usuarioDel = await Usuario.findByIdAndDelete(id);
    res.status(200).json({
      ok:true,
     msg: "Usuario eliminado"
    })

  }catch(error){
    console.log(error);
    res.status(500).json({
      ok:false,
      msg:"Ha ocurrido un error"
    });
  }
}

module.exports = {
  getUser,
  crearUser,
  actualizarUsuario,
  borrarUsuario
}