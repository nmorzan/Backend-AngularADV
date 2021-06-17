const { response } =require('express')

const Medico = require('../models/medicos');
const Hospital = require('../models/hospital');


const crearMedico = async(req,res=response)=>{

  const medico = new Medico({usuario: req.id,...req.body});
  
  try{
    const hospitalBD = await Hospital.findById(req.body.hospital);
    if(!hospitalBD){
      return res.status(404).json({
        ok:false,
        msg:"ese hospital no existe",
      });
    }

    await medico.save();

    res.status(200).json({
      ok:true,
      Medico: medico
    });

  }catch(error){
    res.status(500).json({
      ok:false,
      msg:"Ah ocurrido un error inesperado"
    });
  }
};

const obtenerMedicos = async(req,res=response)=>{


  try{
    const medicosDB = await Medico.find({},)
                                  .populate('usuario', 'nombre img')
                                  .populate('hospital', 'nombre img');

    res.status(200).json({
      ok:true,
      medicosDB
    });

  }catch(error){
    res.status(500).json({
      ok:false,
      msg:"Ah ocurrido un error inesperado"
    });
  }
};

const editarMedico = async(req,res=response)=>{
    const medicoID = req.params.id;
    const usuario = req.id;


  try{
    const medicoBD = await Medico.findById(medicoID);
    if(!medicoBD){
      res.status(400).json({
        ok:false,
        msg:"No se encuentra un medico con ese ID"
      });
    }
    const medicoUpdates = {
      ...req.body,
      usuario: usuario
    }

    const medicoNew = await Medico.findByIdAndUpdate(medicoID, medicoUpdates, {new:true})

    res.status(200).json({
      ok:true,
      medicoNew
    });

  }catch(error){
    res.status(500).json({
      ok:false,
      msg:"Ah ocurrido un error inesperado"
    });
  }
};

const eliminarMedico = async(req,res=response)=>{
  const medicoID = req.params.id;

try{
  const medicoBD = await Medico.findById(medicoID);
  if(!medicoBD){
    res.status(400).json({
      ok:false,
      msg:"No se encuentra un medico con ese ID"
    });
  }

  await Medico.findByIdAndDelete(medicoID);

  res.status(200).json({
    ok:true,
    msg:"Medico eliminado"
  });

}catch(error){
  res.status(500).json({
    ok:false,
    msg:"Ah ocurrido un error inesperado"
  });
}
};


module.exports = {
  crearMedico,
  obtenerMedicos,
  editarMedico,
  eliminarMedico
}
