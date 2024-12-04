
require ('dotenv').config();

const express = require('express');
// const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// app.use (cors());
app.use(express.json());
app.use(express.static('storage'));
app.use(express.urlencoded({ extended: true })); 

app.use('/', require('./routes'));

app.listen(port, ()=> {
    console.log(`API REST corriendo en el puerto:  ${port}`);  
})