
var koa = require('koa');
var app = koa();
var Visa = require('../index.js');
var visa = new Visa();
var session = require(koa-session);

var users = {
  'cultofmetatron': '12345',
  'hulioMandingo':  '12345'
}

var LocalStrategy = require('../lib/local.js');

visa.useStrategy('local', new LocalStrategy({
  
}));


app.use(session)
app.use(visa.mount());


app.use(function *(){
  this.body = 'Hello World';
});

app.listen(3000);
