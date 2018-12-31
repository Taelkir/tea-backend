var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

var app = express();
const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/tea";

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // https://expressjs.com/en/api.html#express.urlencoded
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);

// MongoDB connection
mongoose.connect(mongoURI, { useNewUrlParser: true });
var db = mongoose.connection;
// mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log(`Successfully connected to mongoose`);
});

// 404 handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler, needs to be last
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  if(err.status === 404){
    res.send({
      errorStatus: err.status,
      message: "Check your URL for errors"
    })
  } else {
    res.send({
      status: err.status,
      message: (err.message || "Something went wrong"),
      details: err
    })
  }
});


module.exports = app;
