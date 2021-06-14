'use strict'
//Importo express y lo inicializo
const express = require('express');
const app = express();
const cors = require('cors')

//habilito las variables de entorno .env
require('dotenv').config()

//dejo que las peticiones al backend se hagan desde cualquier parte del mundo
app.use(cors())

//importar un modulo al archivo
const { dbConection} = require('./database/dbConfig');


//inicializo la base de datos
dbConection();


//rutas
app.get("/", (req,res)=>{
  res.json({
    msg:"Hola  a todos"
  })
})




//Levanto el servidor
app.listen(process.env.PORT, () =>{
  console.log("Servidor levantado")
})