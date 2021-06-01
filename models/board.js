'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BoardSchema = Schema({
    title: String,
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Board', BoardSchema);