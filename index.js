'use strict'
//Importo express y lo inicializo
const express = require('express');
const app = express();
const cors = require('cors')

//habilito las variables de entorno .env
require('dotenv').config()


//MIDLEWARES
//dejo que las peticiones al backend se hagan desde cualquier parte del mundo
app.use(cors())
//lectura del bod y y parseo (miiddleware)
app.use(express.json());


//inicializo la base de datos
//importar la funcion desde la carpeta de base de datos que inicializa la bdd
const { dbConection } = require('./database/dbConfig');
//inicializo la base de datos
dbConection();

//rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));


//Levanto el servidor
app.listen(process.env.PORT, () =>{
  console.log("Servidor levantado")
})