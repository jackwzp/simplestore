'use strict';

var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
    name: String,
});

var Category = module.exports = mongoose.model('Category', categorySchema);
