var Promise = require('bluebird');
var koa = require('koa');
var fn = require('fs');
var session = require('koa-session');
var mount = require('koa-mount');
var _ = require('underscore');

var Visa = function(options) {
  options = options || {};
  this._key = 'visa';
  this.sessionKey = options.sessionKey || 'some secret key';
  this._strategies = {};
  this.Promise = Promise;

};

Visa.prototype = Object.create({});

Visa.fn = Visa.prototype;

Visa.fn.useStrategy = function(name, strategy) {
  this._strategies[name] = strategy;
};

Visa.fn.mount = function() {
  var koaApp = koa();
  //app.keys = [this.sessionKey];
  //use the session middleware
  //koaApp.use(session);
  koaApp.use(function *(next) {
    console.log('visa activated');
    yield next;
  });
  this.loadStrategies(koaApp);


  return mount(koaApp);
};

Visa.fn.isAuthenticated = function(ctx) {
  return true;
};

Visa.fn.authenticate = function(pass, fail) {
  var args = Array.prototype.slice.call(arguments, 2);
  var self = this;
  return function *(next) {
    if (self.isAuthenticated(this)) {
      yield pass;
    } else {
      yield fail;
    }
    yield next;
  };
};

Visa.fn.loadStrategies = function(app) {
  

};


module.exports = Visa;
