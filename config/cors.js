
const {development } = require('./environment');
const config = development;

const corsOptions = {
  origin: ['http://localhost:5173', 'http://149.50.145.228:80', 'http://149.50.145.228:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: false, 
  optionsSuccessStatus: 204 
};

const PORT = config.PORT
const URL_API = config.URL_API;
const HOST = config.HOST || '0.0.0.0';

module.exports = {
  corsOptions,
  PORT,
  URL_API,
  HOST
};

