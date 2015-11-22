'use strict';

var Book = require('../models/book');
var Category = require('../models/category');


module.exports = function (router) {

    router.get('/', function (req, res) {
        res.render('manage/index');
    });

//============================
//  Books
//============================       

    router.get('/books', function(req, res) {
        Book.find({}, function(err, books) {
            if(err) throw err;
            var models = {books: books}
            res.render('manage/books', models);
        });

        
    });

    // Add book GET and POST
    router.get('/books/add', function(req, res) {
        Category.find({}, function(err, categories) {
            if(err) throw err;
            var model = {categories: categories};
            res.render('books/add', model);
        });
        
    });

    router.post('/books', function(req, res) {
        var title = req.body.title;
        var author = req.body.author;
        var category = req.body.category;
        var publisher = req.body.publisher;
        var price = req.body.price;
        var description = req.body.description;
        var picture = req.body.picture;

        if (isNaN(price)) {
            req.flash('error', "Price must be a number");
            res.location('/manage/books/add');
            res.redirect('/manage/books/add');
        }
        else {
            var newBook = new Book({
                title: title,
                category: category,
                description: description,
                author: author,
                publisher: publisher,
                picture: picture,
                price: price
            });

            newBook.save(function(err) {
                if(err) throw err;
                req.flash('success', "Booked Added");
                res.redirect('/manage/books');
            });
        }

    });

    
    // Update book GET and POST
    router.get('/books/edit/:id', function(req, res) {
        Category.find({}, function(err, categories) {
            if(err) throw err;
            Book.findOne({_id: req.params.id}, function(err, book) {
                if(err) throw err;
                var model = {book: book, categories: categories};
                res.render('books/edit', model);
            })
        })
    });


    router.post('/books/edit/:id', function(req, res) {
        var title = req.body.title;
        var author = req.body.author;
        var category = req.body.category;
        var publisher = req.body.publisher;
        var price = req.body.price;
        var description = req.body.description;
        var picture = req.body.picture;

        var data = {
            title: title,
            category: category,
            description: description,
            author: author,
            publisher: publisher,
            picture: picture,
            price: price
        };

        Book.update({_id: req.params.id}, data, function(err) {
            if(err) throw err;
            res.redirect('/manage/books');
        })
    });


    // Delete Book
    router.delete('/books/delete/:id', function(req, res) {
        Book.remove({_id: req.params.id}, function(err) {
            if(err) throw err;
            res.redirect('/manage/books');
        })
    });

//============================
//  Categories
//============================       
    router.get('/categories', function(req, res) {
        Category.find({}, function(err, categories) {
            if(err) throw err;
            var models = {categories: categories}
            res.render('manage/categories', models);
        });
        
    });

    // Add category GET
    router.get('/categories/add', function(req, res) {
        res.render('categories/add');        
        //res.send("DFJOISD");
    });

    // Add category POST
    router.post('/categories', function(req, res) {
        var name = req.body.name;

        var newCategory = new Category({
            name: name
        });

        newCategory.save(function(err) {
            if(err) throw err;
            res.redirect('/manage/categories');
        });
    });


    // Edit Category GET
    router.get('/categories/edit/:id', function(req, res){
        Category.findOne({_id: req.params.id}, function(err, category){
            if (err) throw err;
            var model = {category: category};
            res.render('categories/edit', model);
        });
    }); 

    // Edit Category POST
    router.post('/categories/edit/:id', function(req, res){
        var name = req.body.name;
        var data = {name: name};

        // TODO: should also update all existing book's category
        // Book.find({category: name}, function(err, books){
        //     if(err) throw err;
        //     book.update
        // })

        Category.update({_id: req.params.id}, data, function(err){
            if(err) throw err;
            res.redirect('/manage/categories');
        });
    });

    // Delete Category
    router.delete('/categories/delete/:id', function(req, res) {
        Category.remove({_id: req.params.id}, function(err) {
            if(err) throw err;
            // this actually doesn't redirect, the window in main.js does
            res.redirect('/manage/categories');
        })
    });

};
