'use strict';

var mongoose = require('mongoose');

var db = function() {
    return {
        config: function(conf) {
            var dbURI = 'mongodb://localhost/bookstore';
            mongoose.connect(dbURI);
            
            // successfully
            mongoose.connection.on('connected', function () {
              console.log('Mongoose default connection open to ' + dbURI);
            });

            // error
            mongoose.connection.on('error',function (err) {
              console.log('Mongoose default connection error: ' + err);
            });

            // disconnected
            mongoose.connection.on('disconnected', function () {
              console.log('Mongoose default connection disconnected');
            });

            // If the Node process ends, close the Mongoose connection 
            process.on('SIGINT', function() {
              mongoose.connection.close(function () {
                console.log('Mongoose default connection disconnected through app termination');
                process.exit(0);
              });
            });

        }
    };
}();

module.exports = db;

