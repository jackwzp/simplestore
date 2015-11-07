'use strict';

var Book = require('../models/book');


module.exports = function (router) {

    router.get('/', function (req, res) {
        Book.find({}, function(err, books) {
            if (err) throw err;
            
            var model = {books: books}
            console.log(model);
            res.render('index', model);
        })
    });

};
