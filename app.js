const express = require('express');
const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");
const app = express();

const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

app.use(cors({origin: true}));


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max:1000
});
 

const speedLimiter = slowDown({
  windowMs: 5 * 60 * 1000,
  delayAfter: 1000,
  delayMs: 1000
});

app.use(limiter);
app.use(speedLimiter);

const wordRoutes = require('./api/routes/word');


const uri = process.env.uri;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true, useFindAndModify: false}
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
    });


app.use('/words', wordRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status= 404;
    next(error);
})

app.use((error, req, res, next) => {
res.status(error.status || 500);
res.json({
    error:{
        message:error.message
    }
});
});

module.exports = app;

