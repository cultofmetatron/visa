
var koa = require('koa');
var app = koa();
var Visa = require('../index.js');
var visa = new Visa();
var session = require('koa-session');
var _ = require('underscore');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

var cascade = function(args) {
  args = Array.prototype.slice.call(arguments);
  return function *(next) {
    yield _.reduce(args, function(memo, nextone) {
      var self = this;
      return function *(next){
        yield memo.call(self, nextone.call(self, next));
      };
    }, function *(next) {
      yield next;
    }, this).call(this, next);
  };
};



var users = {
  'cultofmetatron': '12345',
  'hulioMandingo':  '12345'
};

//var LocalStrategy = require('../lib/local.js');
//console.log('localize me', LocalStrategy);
//visa.useStrategy('local', new LocalStrategy({
  
//}));


app.use(session());
app.use(visa.mount());
/*
app.use(visa.authenticate(
  function* () {
  console.log('middleware works!!');
  console.log('this: ', this);
  this.body = "authentication failed";
}, function *(next) {
  console.log('second middleware');
  yield next;
}));
*/

app.use(cascade(
  function *(next){
    console.log('1');
    yield next;
    console.log('1');
  },
  function *(next){
    console.log('2');
    yield next;
    console.log('2');
  },
  function *(next){
    console.log('3');
    this.body = yield fs.readFileAsync('./index.js','utf8');
    yield next;
    console.log('3');
  },
  function *(next){
    console.log('4');
    this.body = this.body + 'Hello my';
    yield next;
    console.log('4');
  }
));

app.use(function *(){
  
});

app.listen(3000);
