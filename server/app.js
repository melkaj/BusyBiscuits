require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOptions = {
    origin: "http://localhost:8080",
    methods: "GET, HEAD, POST, DELETE, OPTIONS",
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


module.exports = app;