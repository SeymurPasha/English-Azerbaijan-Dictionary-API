const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

app.use(cors());

const countryRoutes = require('./api/routes/country');
const userRoutes = require('./api/routes/user');

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


app.use((res, req, next) => {
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Headers', 
'Origin, X-Requested-With, Content-Type, Accept, Authorization');
if (req.method === "OPTIONS") {
    res.header('Acces-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
}
next();
})

app.use('/countries', countryRoutes);
app.use("/users", userRoutes);

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