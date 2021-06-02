'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    role: String,
    image: String,
    boards: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Board'
        }
    ],
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
