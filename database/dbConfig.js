const mongoose = require('mongoose');


const dbConection= async()=> {

//nmorzan:IElkqWNY3bQvq4aE contrseña y usuario mongo

  try {
      await mongoose.connect(process.env.DB_CONECT, 
                            {
                              useNewUrlParser: true,
                              useUnifiedTopology: true,
                              useCreateIndex:true
                            }
    );
    
    console.log("Conexion a la base de datos establecida")
  }
  catch (error){
    console.log(error);
    throw new Error('Error a la hora de inicializar la BD ver credenciales')
  }
}

module.exports ={
  dbConection
}

