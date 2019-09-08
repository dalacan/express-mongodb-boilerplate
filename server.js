const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const config = require('./configs/config');
const indexRouter = require('./routes/index');
const statusRouter = require('./routes/status');
const userRouter = require('./routes/user');

const app = express();

mongoose
  .connect(config.db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  // eslint-disable-next-line no-console
  .then(() => console.log(`Connected to MongoDB ${config.db}`))
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log('Failed to connect to MongoDB...', err);
    process.exit();
  });

app.use(express.json());

app.use('/', indexRouter);
app.use('/status', statusRouter);
app.use('/user', userRouter);

// app.use('/', function(req, res) {
//     res.send('hello worlds');
// });

const server = http.createServer(app);
const port = 3000;
server.listen(port);

// eslint-disable-next-line no-console
console.debug(`Server listening on port ${port}`);

module.exports = app; // for testing
