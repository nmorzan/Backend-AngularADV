const jtw = require('jsonwebtoken');

//genero una funcion para generar tokens, aca le pido los datos el payload
const generarJWT = (id) =>{

  return new Promise ((resolve, reject)=>{
    //defino el payload con los datos ingresados
    const payload={
      id
    };

    //creo el jwt
    //payload: data que encrypto o verifico , process.env.JWT_TOKEN: clave secreta par ael calculo, es una variable de entorno
    //{expiresIn: '24hs'} tiempo de duracion    (err,token): Devolucion
    jtw.sign(payload, process.env.JWT_TOKEN,{expiresIn: '24h'},(err,token)=>{
      if(err){
        console.log(err);
        reject('no se pudo generar el token');
      }else{
        resolve(token);
      };
    });
  })
}

module.exports = {
  generarJWT
}