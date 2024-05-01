const express = require('express');
const path = require('path');   //sirve para unir la url del directorio
const morgan = require('morgan');   //sirve para ver las peticiones que llegan al server
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const app = express();

//importando rutas
const productoRoutes = require('./routes/producto')

//configuracion
app.set('port', process.env.PORT || 3000); //obtiene valor del sistema operativo o asigna 3000
app.set('view engine', 'ejs');              // configura el motor de plantillas
app.set('views', path.join(__dirname,'views')) //__dirname obtiene la direccion actual desde el so

// middlewares: son funciones que se ejecutan antes de que vengan las peticiones de los usuarios
app.use(morgan('dev'));             //permite ver las peticiones que llegan al servidor
app.use(myConnection(mysql, {       //configuracion conexion con bd mysql
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: 3306,
    database: 'empresa_productos'
}, 'single'));
app.use(express.urlencoded({extended: false}))  //permite comprender los datos que llegan desde el formulario, no recibe imagenes o datos complejos


// routes: rutas del servidor, son las peticiones del cliente
app.use('/', productoRoutes);


// archivos estaticos
app.use(express.static(path.join(__dirname,'public')));

//iniciando el servidor
app.listen(app.get('port'), () => {
    console.log('Servidor en puerto 3000')
})