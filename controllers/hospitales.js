const { response } = require('express');
const Hospital  = require('../models/hospital');



const obtenerHospital = async(req,res=response)=>{

  try{
    const hospitalesDB = await Hospital.find({},'nombre img')
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
  const id = req.id;
  const hospitalID = req.params.id;

  try{

    const hospitalBD = await Hospital.findById(hospitalID);
    //verifico que exista
    if(!hospitalBD){
      res.status(400).json({
        ok:false,
        msg:"no se ha podido encontrar el hospital con ese ID"
      });
    }
    //si existe, desestructuro la informacion del hospital

    const updateHospital = {
      ...req.body,
      usuario: id
    }

   const hospitalAct = await Hospital.findByIdAndUpdate(hospitalID, updateHospital , { new: true});


    res.status(200).json({
      ok: true,
      hospitalAct
    });
  }catch(error){
    res.status(500).json({
      ok:false,
      msg:"Ha ocurrido un error"
    });
  }

}

const borrarHospital = async(req,res=response)=>{
  
  const hospitalID = req.params.id;
  
  try{
    const hospitalDB = await Hospital.findById(hospitalID);

    if(!hospitalDB){
      res.status(400).json({
        ok:false,
        msg:"Ese id no es de ningun hospital de la BDD"
      });
    }

    await Hospital.findByIdAndDelete(hospitalID);

    res.status(200).json({
      ok: true,
      msg:"Hospital eliminado"
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