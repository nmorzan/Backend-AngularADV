const Usuarios = require('../models/usuario');
const Medicos = require('../models/medicos');
const Hospitales = require('../models/hospital');

const buscarAll = async(req,res) =>{

  //si buscamos directamente con este valor, debemos hacer una busqueda exactamente igual a lo q hay en la BDD
  const buscar = req.params.busqueda;
  const regexp = new RegExp(buscar, 'i');

  try{

   const [usuariosbd, medicosbd, hospitalesbd ] = await Promise.all([
      Usuarios.find({nombre: regexp}),
      Medicos.find({nombre:regexp}),
      Hospitales.find({nombre:regexp})
    ]);

    res.status(200).json({
      ok:true,
      Buscar: buscar,
      usuariosbd,
      medicosbd,
      hospitalesbd
    })
  }catch(error){
    res.status(500).json({
      ok:false,
      msg:"Ha ocurrido un error"
    })
  }
}

const getColeccion = async(req, res)=>{

  const coleccion = req.params.tabla;
  const buscar = req.params.busqueda;
  const expreg = new RegExp(buscar, 'i');

  let data= [];
  switch (coleccion) {
    case 'usuarios':
      data = await Usuarios.find({nombre:expreg});
      break;
    case 'hospitales':
      data = await Hospitales.find({nombre:expreg}).populate('usuario', 'nombre img');
      break;
    case 'medicos':
      data = await Medicos.find({nombre:expreg}).populate('usuario', 'nombre img').populate('hospital', 'nombre img');
      break;

    default:
      return res.status(400).json({
        ok:false,
        msg:"La coleccion debe ser usuarios/hospitales/mediocos"
      })
  }
try{
  
    res.status(200).json({
    ok:true,
    coleccion,
    data
  })

}catch(error){
  res.status(500).json({
    ok:false,
    msg:"Ah ocurrido un error inesperado"
  })
}



}






module.exports={
  buscarAll,
  getColeccion
}