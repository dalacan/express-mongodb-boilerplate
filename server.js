var http = require('http');
var express = require('express');
var mongoose = require("mongoose");
var config = require('./configs/config');

var indexRouter = require('./routes/index');
var statusRouter = require('./routes/status');
var userRouter = require('./routes/user');

var app = express();

mongoose
  .connect(config.db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() =>
    console.log('Connected to MongoDB ' + config.db)
  )
  .catch(err => {
    console.log("Failed to connect to MongoDB...", err);
    process.exit();
  });

app.use(express.json());

app.use('/', indexRouter);
app.use('/status', statusRouter);
app.use('/user', userRouter);

// app.use('/', function(req, res) {
//     res.send('hello worlds');
// });

var server = http.createServer(app);
var port = 3000;
server.listen(port);

console.debug('Server listening on port ' + port);

module.exports = app; // for testing