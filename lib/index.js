var Promise = require('bluebird');
var fn = require('fs');

var Visa = function() {
  this._key = 'visa';
  this._strategies = {};


};

Visa.prototype = Object.create({});

Visa.fn = Visa.prototype;

Visa.use = function(name, strategy) {

};
