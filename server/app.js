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



/**
 * ERROR HANDLING
 */
app.use((req,res, next) => {
    next(createError(404));
});
  
app.use((err,req,res,next) => {
    console.log(`From error handling:\n${err.message}`);
    res.status(err.status || 500).json('Something went wrong');
})


module.exports = app;