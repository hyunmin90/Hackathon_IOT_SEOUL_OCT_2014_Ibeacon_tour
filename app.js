var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var spotInfo = require('./routes/spotInfo');
var mysql = require('mysql');
var choice = require('./routes/choice');
var userdatas = require('./routes/userdatas');
var recommend = require('./routes/recommend');

var map = require('./routes/map');


var search = require('./routes/search');
var translate = require('./routes/translate');


var app = express();

var passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy;

var connection = 
    {
      host     : 'ja-cdbr-azure-west-a.cloudapp.net',
      user     : 'bb067d1b1ed5aa',
      password : '5d2f5746',
      database : 'bline',
    };

global.dbcon=mysql.createConnection(connection);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);
app.use('/login',login);
app.use('/choice',choice);
app.use('/userdatas',userdatas);
app.use('/recommend', recommend);
app.use('/search',search);
app.use('/spotInfo', spotInfo);

app.use('/map', map);



app.use('/translate',translate);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}





// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
