'use strict';

var Book = require('../models/book');
var helper = require('./helper');

module.exports = function (router) {

    router.get('/', function (req, res) {
        Book.find({}, function(err, books) {
            if (err) throw err;
            
            books.forEach(function(book) {
                //console.log(book);
                book.short = helper.truncText(book.description);
            });

            var model = {books: books}
            //console.log(model);
            res.render('index', model);
        })
    });

};
