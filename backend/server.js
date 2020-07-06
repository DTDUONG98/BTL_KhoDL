'use strict'

const express = require('express')
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const mssql = require('mssql')
const PORT =  3000

// turn on CORS
app.use(cors());
// Permit access to the file:
app.use('/', express.static('public/upload'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// Authentication:
//app.use(require('./middleware/auth.middleware'));
// Routes:
app.use(require('./routes/index'));

// connect to database:


// Disable caching of scripts for easier testing
app.use(function noCache(req, res, next) {
    if (req.url.indexOf('/scripts/') === 0) {
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.header('Pragma', 'no-cache');
        res.header('Expires', 0);
    }
    next();
});

app.locals.pretty = true;
app.locals.compileDebug = true;

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});


// Listen port

const server = require('http').createServer(app)
server.listen(PORT, () => {
    console.log("Server is running in port "+ PORT);
})
