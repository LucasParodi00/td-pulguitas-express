
require ('dotenv').config();

const express = require('express');
const cors = require('cors');
const { corsOptions, PORT, HOST } = require('./config/cors');

const app = express();

app.use (cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(express.static('storage'));
app.use(express.urlencoded({ extended: true })); 

app.use('/', require('./routes'));

app.listen(PORT, '0.0.0.0', ()=> {
    console.log(`API REST corriendo en el puerto:  ${PORT}`);  
})