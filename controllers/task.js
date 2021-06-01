var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Task = require('../models/task');
var Board = require('../models/board');

function getTask(req, res){
	var taskId = req.params.id;

	Task.findById(taskId).populate({path: 'board'}).exec((err, task) => { //????? prueba
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!task){
				res.status(404).send({message: 'La tarea no existe !!'});
			}else{
				res.status(200).send({task: task});
			}
		}
	});
}

function getTasks(req, res){
	var boardId = req.params.board;

	if(!boardId){
		var find = Task.find({}).sort('number');
	}else{
		var find = Task.find({board: boardId}).sort('number');
	}

	find.populate({
		path: 'board'}).exec(function(err, tasks){
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!tasks){
				res.status(404).send({message: 'No hay tareas !!'});
			}else{
				res.status(200).send({tasks: tasks});
			}
		}
	});
}

function saveTask(req, res){
	var task = new Task();

	var params = req.body;
    console.log( {params} ); //revisando*****
	task.title  = params.title;
	task.save((err, taskStored) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!taskStored){
				res.status(404).send({message: 'No se ha guardado la tarea'});
			}else{
				res.status(200).send({task: taskStored});
			}
		}
	});
}

function updateTask(req, res){
	var taskId = req.params.id;
	var update = req.body;

	Task.findByIdAndUpdate(taskId, update, (err, taskUpdated) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!taskUpdated){
				res.status(404).send({message: 'No se ha actualizado la tarea'});
			}else{
				res.status(200).send({task: taskUpdated});
			}
		}
	});
}

function deleteTask(req, res){
	var taskId = req.params.id;
	
	Task.findByIdAndRemove(taskId, (err, taskRemoved) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!taskRemoved){
				res.status(404).send({message: 'No se ha borrado la tarea'});
			}else{
				res.status(200).send({task: taskRemoved});
			}
		}
	});
}


function uploadFile(req, res){
	var taskId = req.params.id;
	var file_name = 'No subido...';

	if(req.files){
		var file_path = req.files.file.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];

		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];

		if(file_ext == 'mp3' || file_ext == 'ogg'){

			Task.findByIdAndUpdate(taskId, {file: file_name}, (err, taskUpdated) => {
				if(!taskUpdated){
					res.status(404).send({message: 'No se ha podido actualizar la cación'});
				}else{
					res.status(200).send({task: taskUpdated});
				}
			});

		}else{
			res.status(200).send({message: 'Extensión del archivo no valida'});
		}
		
	}else{
		res.status(200).send({message: 'No has subido el fichero de audio...'});
	}
}

function getTaskFile(req, res){
	var imageFile = req.params.taskFile;
	var path_file = './uploads/tasks/'+imageFile;
	fs.exists(path_file, function(exists){
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe el fichero de tarea...'});
		}
	});
}


module.exports = {
	getTask,
	getTasks,
	saveTask,
	updateTask,
	deleteTask,
	uploadFile,
	getTaskFile
};