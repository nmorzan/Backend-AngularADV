const { response } = require('express');
const HospitalSchema  = require('../models/hospital');
const Hospital = HospitalSchema;


const obtenerHospital = async(req,res=response)=>{

  try{
    const hospitalesDB = await Hospital.find({},)
                                       .populate('usuario','nombre img');
                                       
    res.status(200).json({
      ok: true,
      Hospitales: hospitalesDB
    });
  }catch(error){
    res.status(500).json({
      ok:false,
      msg:"Ha ocurrido un error"
    });
  }

}

const crearHospital = async(req,res=response)=>{

  const hospital = new Hospital({usuario:req.id,...req.body});
  
  try{

    const hospitalDB = await hospital.save();


    res.status(200).json({
      ok: true,
      Hospital: hospitalDB
    });
  }catch(error){
    res.status(500).json({
      ok:false,
      msg:"Ha ocurrido un error"
    });
  }

}

const editarHospital = async(req,res=response)=>{
  try{
    res.status(200).json({
      ok: true,
      msg:"Hola desde editar hospitales"
    });
  }catch(error){
    res.status(500).json({
      ok:false,
      msg:"Ha ocurrido un error"
    });
  }

}

const borrarHospital = async(req,res=response)=>{
  try{
    res.status(200).json({
      ok: true,
      msg:"Hola desde borrar hospitales"
    });
  }catch(error){
    res.status(500).json({
      ok:false,
      msg:"Ha ocurrido un error"
    });
  }

}
module.exports={
  obtenerHospital,
  crearHospital,
  editarHospital,
  borrarHospital
}