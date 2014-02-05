
var koa = require('koa');
var app = koa();
var Visa = require('../index.js');
var visa = new Visa();
var session = require('koa-session');
var _ = require('underscore');

var cascade = function() {
  var args = Array.prototype.slice.call(arguments);
  
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
  },
  function *(next){
    console.log('2');
    yield next;
  },
  function *(next){
    console.log('3');
    yield next;
  },
  function *(next){
    console.log('4');
    this.body = 'Hello my';
    yield next;
  }
));

app.use(function *(){
  this.body = this.body + ' World';
});

app.listen(3000);
