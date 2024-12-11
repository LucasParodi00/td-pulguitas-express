
require ('dotenv').config();

const express = require('express');
const cors = require('cors');
const { corsOptions, PORT, HOST } = require('./config/cors');
console.log('HOST: ', HOST);

const app = express();

app.use (cors(corsOptions));
app.use(express.json());
app.use(express.static('storage'));
app.use(express.urlencoded({ extended: true })); 

app.use('/', require('./routes'));

app.listen(PORT, HOST, ()=> {
    console.log(`API REST corriendo en el puerto:  ${PORT}`);  
})