var _ = require('underscore');
//givena  prototype and clone, it creates a new version of teh function with the prototype
var clone = function(fn, prototype) {
  var ret = function() {
    fn.apply(this, arguemnts);
  }
  ret.prtotype = (prototype) ? Object.create(prototype) : Object.create(fn.prototype);
  return ret;
};

//used for extending our prototypes!
var extend = function(extensions) {
  var proto = _.extend({}, this.prototype, extensions);
  var newConstructor = clone(this, proto);
  newConstructor.extend = extend;
};

var LocalStrategy = function() {
  
};

LocalStrategy.prototype = Object.create({});

LocalStrategy.prototype.findById = function() {};




LocalStrategy.extend = extend;











