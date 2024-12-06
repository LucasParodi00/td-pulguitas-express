



const corsOptions = {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true, 
  optionsSuccessStatus: 200 
};

const PORT = process.env.PORT || 5000;
const URL_API = process.env.URL_API;
const HOST = process.env.HOST;


module.exports = {
  corsOptions,
  PORT,
  URL_API,
  HOST
};
