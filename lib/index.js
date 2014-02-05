var Promise = require('bluebird');
var fn = require('fs');
var session = require('koa-session');



var Visa = function() {
  this._key = 'visa';
  this._strategies = {};


};

Visa.prototype = Object.create({});

Visa.fn = Visa.prototype;

Visa.fn.use = function(name, strategy) {

};

Visa.fn.initialize = function() {

};
