'use strict'

var express = require('express');
var TaskController = require('../controllers/task');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/tasks' });

api.get('/task/:id', md_auth.ensureAuth, TaskController.getTask);
api.post('/task', md_auth.ensureAuth, TaskController.saveTask);
api.get('/tasks/:board?', md_auth.ensureAuth, TaskController.getTasks);
api.put('/task/:id', md_auth.ensureAuth, TaskController.updateTask);
api.delete('/task/:id', md_auth.ensureAuth, TaskController.deleteTask);
api.post('/upload-file-task/:id', [md_auth.ensureAuth, md_upload], TaskController.uploadFile);
api.get('/get-task-file/:taskFile', TaskController.getTaskFile);

module.exports = api;
