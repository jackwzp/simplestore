'use strict';

var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
    title: String,
    category: String,
    description: String,
    author: String,
    publisher: String,
    price: Number,
    picture: String
});

var Book = module.exports = mongoose.model('Book', bookSchema);
