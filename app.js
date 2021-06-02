'use strict'
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargamos rutas:
var user_routes = require('./routes/user');
var task_routes = require('./routes/task');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); //convierte a objeto JSON los datos que vienen por http

//cabeceras:
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

	next();
});

//Rutas base:
app.use('/api', user_routes);
app.use('/api', task_routes);


app.get('/prueba', function (req, res){
    res.status(200).send({message: 'Bienvenido al backend de prTAsks-vr'});
});

module.exports = app;