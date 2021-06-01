'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = Schema({
    Title: String,
    completed: { type : Boolean, default: false},
    boards: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Board'
        }
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Task', TaskSchema);