'use strict';

var Book = require('../models/book');
var Category = require('../models/category');

module.exports = function(router) {
    router.get('/', function(req, res) {
        // Get cart from session
        var cart = req.session.cart;
        var displayCart = {items:[], total:0};
        var total = 0;

        // Get total
        for(var item in cart) {
            displayCart.items.push(cart[item]);
            total += cart[item].qty * cart[item].price;
        }
        displayCart.total = total;

        // Render cart view
        var data = {cart: displayCart};
        console.log(data)
        res.render('cart/index', data);
    });


    // Add book to cart
    router.post('/:id', function(req, res) {
        req.session.cart = req.session.cart || {};
        var cart = req.session.cart;

        Book.findOne({_id: req.params.id}, function(err, book){
            if(err) throw err;

            if(cart[req.params.id]) {
                cart[req.params.id].qty++;
            }
            else {
                cart[req.params.id] = {
                    item: book._id,
                    title: book.title,
                    price: book.price,
                    qty: 1
                }
            }

            res.redirect('/cart');
        });
    });

    // Empty cart

}