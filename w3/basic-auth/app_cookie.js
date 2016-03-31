var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var app = express();

app.use(logger('dev'));
app.use(cookieParser('12345-67890-09876-54321')); //secret key

function auth(req, res, next){
  console.log(req.headers);

  if(!req.signedCookies.user){
    var authHeader = req.headers.authorization;
    if(!authHeader){
      var err = new Error('You are not authenticated, not auth provided');
      err.status = 401;
      next(err);
      return;
    }
    //we have auth headers
    var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];
    //Basic YWRtaW46cGFzc3dvcmQ=
    if(user=='admin' && pass=='password'){
      res.cookie('user','admin',{signed:true});
      next() //authorized
    } else {
      var err = new Error('You are not authenticated, wrong params');
      err.status = 401;
      next(err);
    }
  } else { //we have a cookie
    if(req.signedCookies.user === 'admin'){
      console.log(req.signedCookies.user);
      next()
    } else {
      var err = new Error('You are not authenticated, wrong cookie');
      err.status = 401;
      next(err);
    }
  }

}

app.use(auth)


app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.writeHead(404, {
    'Content-Type': 'text/plain'
  });
  res.end('Not Found')
});


app.use(function(err,req,res,next) {
  res.writeHead(err.status || 500, {
    'WWW-Authenticate': 'Basic',
    'Content-Type': 'text/plain'
  });
  res.end(err.message);
});

module.exports = app;
