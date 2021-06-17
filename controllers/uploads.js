const { response } = require('express');
const  path  = require('path');
const fs = require('fs');
//generacion de nombres unicoas
const { v4: uuidv4 } = require('uuid');
const actualizarImagen = require('../helpers/actualizar-img');



const uploadImg = async (req,res=response)=>{

  const tipo = req.params.tipo;
  const id = req.params.id;

  //validar tipo
  const tiposValidos = ['hospitales', 'medicos','usuarios'];
  if(!tiposValidos.includes(tipo)){
    return res.status(400).json({
      ok:false,
      msg:"El tipo no corresponde a ninguna coleccion"
    })
  }


  //miro si viene o no un archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok:false,
      msg:'No se ha cargado nigun archivo'
    });
  }

  //procesar la imagen...
  const imagen = req.files.file;

  //Tomo el nombre de la imagen y la separo por el punto, ej: ejemplo.jpg, se convierte en ['ejemplo','jpg']
  const nombreCortado = imagen.name.split('.');
  const extensionArchivo = nombreCortado[nombreCortado.length - 1];
  //analizo la extencion 
  const extValid =['jpg', 'png', 'jpeg', 'gif'];
  if( !extValid.includes(extensionArchivo)){
    return res.status(400).json({
      ok:false,
      msg:'El archivo cargado no es valido'
    });
  }

  //genero un nombre al archivo
  const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;


  //genero path para guardar la imagen
  const path = `./uploads/${tipo}/${nombreArchivo}`;

  // guardo imagen en carpeta
  imagen.mv(path, (err) =>{
    if (err){
      return res.status(400).json({
        ok:false,
        msg:'El archivo no pudo guardarse'
      });
    }

    //actualizo en la base de datos y si esta la imagen 
    actualizarImagen(tipo,id,nombreArchivo);
  
    try{
      res.status(200).json({
        ok:true,
        msg:"Imagen guardada",
        nombreArchivo
      });
  
    }catch(error){
      res.status(500).json({
        ok:false,
        msg:"Ha ocurrido un error"
      });
    }
  });

}


const verFoto = async(req, res)=>{
  const tipo = req.params.tipo;
  const foto = req.params.foto;

  //validar tipo
  const tiposValidos = ['hospitales', 'medicos','usuarios'];
  if(!tiposValidos.includes(tipo)){
    return res.status(400).json({
      ok:false,
      msg:"El tipo no corresponde a ninguna coleccion"
    });
  }

  const pathImg =  path.join(__dirname, `../uploads/${tipo}/${foto}`)

  if( fs.existsSync(pathImg)){
    res.status(200).sendFile(pathImg);
  }else{
    const noimg =  path.join(__dirname, `../uploads/no-img.jpg`)  
    res.status(200).sendFile(noimg);
  }
}


module.exports = {uploadImg, verFoto}