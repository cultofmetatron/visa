var _ = require('underscore');
//givena  prototype and clone, it creates a new version of teh function with the prototype
var clone = function(fn, prototype) {
  var ret = function() {
    fn.apply(this, arguments);
  };
  ret.prototype = (prototype) ? Object.create(prototype) : Object.create(fn.prototype);
  return ret;
};

//used for extending our prototypes!
var extend = function(extensions) {
  var proto = _.extend({}, this.prototype, extensions);
  var newConstructor = clone(this, proto);
  newConstructor.extend = extend;
  return newConstructor;
};

var Strategy = function() {
  this.initialize();
};

Strategy.prototype = Object.create({});
Strategy.prototype.initialize = function() {};


/*
 * Authenticate takes a hash, 
 *
*/
Strategy.prototype.authenticate = function(options) {};



Strategy.extend = extend;

module.exports = Strategy;










