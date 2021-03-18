require('dotenv').config();

const express     = require('express');
const bodyParser  = require('body-parser');
const cors        = require('cors');
const createError = require('http-errors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOptions = {
    origin: "http://localhost:8080",
    methods: "GET, HEAD, POST, DELETE, PATCH, OPTIONS",
    credentials: true,
    allowedHeaders: "Content-Type, Authotization, X-Requested-With, Access-Control-Allow-Origin",
}
app.use(cors(corsOptions));


/**
 * Endpoints
 */
app.get('/alive', function (req, res) {
    res.send("Ok");
});

app.use('/time-spent', require('./src/api/time-spent/api'));

app.use('/forms', require('./src/api/forms/api'));

app.use('/update-entry', require('./src/api/updateentry/api'));

app.use('/remove-entry', require('./src/api/removeentry/api'));


/**
 * ERROR HANDLING
 */
app.use((req,res, next) => {
    next(createError(404));
});
  
app.use((err,req,res,next) => {
    console.log(`From error handling:\n${err.message}`);
    if (err.errno === 1062)                             res.status(err.status || 500).json('Entry with that date already exists');
    else if (err.errno === 1366 || err.errno === 1048)  res.status(err.status || 500).json('Do not leave entry blank. You can only enter integers');
    else                                                res.status(err.status || 500).json('Something went wrong');
})


module.exports = app;