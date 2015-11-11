'use strict';

var Book = require('../models/book');
var Category = require('../models/category');


module.exports = function (router) {
    router.get('/', function (req, res) {
        res.render('manage/index');
    });

    router.get('/books', function(req, res) {
        Book.find({}, function(err, books) {
            if(err) throw err;
            var models = {books: books}
            res.render('manage/books', models);
        });

        
    });

    router.get('/categories', function(req, res) {
        Category.find({}, function(err, categories) {
            if(err) throw err;
            var models = {categories: categories}
            res.render('manage/categories', models);
        });
        
    });
};
