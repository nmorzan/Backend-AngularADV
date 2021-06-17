const Hospital = require('../models/hospital');
const Medico = require('../models/medicos');
const Usuario = require('../models/usuario');

const  fs = require('fs');

const borrarImagen = (path)=>{
  if(fs.existsSync(path)){
    //borramos la imagen anterior
    fs.unlinkSync(path);
  }
}


const actualizarImagen = async(tipo,id,nombreArchivo)=>{
  let pathViejo = "";
  //antes de actualizar ver de que grupo es la imagen
  switch (tipo) {
    case 'hospitales':
          //miro que ese id realmente pertenezca a un documento de la bdd
          const hospitalDB = await Hospital.findById(id);
          if(!hospitalDB){
            return false;
          }
          //genero un path con la ruta en la que deberia estar almacenada esa imagen
          pathViejo = `./uploads/hospitales/${hospitalDB.img}`;
          //borro imagen si es que existe
          borrarImagen(pathViejo);
          //guardo en la base de datos
          hospitalDB.img = nombreArchivo;
          await hospitalDB.save();
          return true;
    break;
    case 'medicos':
          //miro que ese id realmente pertenezca a un documento de la bdd
          const medicoDB = await Medico.findById(id);
          if(!medicoDB){
            return false;
          }
          //genero un path con la ruta en la que deberia estar almacenada esa imagen
          pathViejo = `./uploads/medicos/${medicoDB.img}`;
          //borro imagen si es que existe
          borrarImagen(pathViejo);
          //guardo en la base de datos
          medicoDB.img = nombreArchivo;
          await medicoDB.save();
          return true;
   break;
   case 'usuarios':
          //miro que ese id realmente pertenezca a un documento de la bdd
          const usuarioDB = await Usuario.findById(id);
          if(!usuarioDB){
            return false;
          }
          //genero un path con la ruta en la que deberia estar almacenada esa imagen
          pathViejo = `./uploads/usuarios/${usuarioDB.img}`;
          //borro imagen si es que existe
          borrarImagen(pathViejo);
          //guardo en la base de datos
          usuarioDB.img = nombreArchivo;
          await usuarioDB.save();
          return true;
    break;

    default:
        return false;
  }
}


module.exports = actualizarImagen;