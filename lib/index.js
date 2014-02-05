var Promise = require('bluebird');
var koa = require('koa');
var fn = require('fs');
var session = require('koa-session');
var mount = require('koa-mount');
var _ = require('underscore');

var Visa = function(options) {
  this._key = 'visa';
  this.sessionKey = options.sessionKey || 'some secret key';
  this._strategies = {};
  this.Promise = Promise;
  console.log('gets here');

  console.log('this.app: ', this.app);
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
  this.loadStrategies(koaApp);



  return mount(koaApp);
};

Visa.fn.loadStrategies(app) {
  

};


Visa.fn.Sessions = function() {
  return function *() {
    
  };
};

module.exports = Visa;
