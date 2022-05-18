require('dotenv').config()
const https = require('https');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();



/**
 * middleware
 * */
const mongoose = require('mongoose');
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('database connected'))
  .catch((err) => {
    console.log(err);
    console.log('connection faild');
  });

/**
 * middleware
 * */

const corsOptions = {
  origin: 'https://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json()); // bodyparser : old
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const {encrypt,decrypt} = require('./helper/encrypt_decrypt')

app.get('/', (req, res) => {
  res.send('ping')
})

app.use('/v1', require('./routes/v1'));



/**
 * running server with HTTPS
 * */
 const PORT = process.env.PORT || 8000;
 const options = {
   key: fs.readFileSync('./cert/key.pem'), // Replace with the path to your key
   cert: fs.readFileSync('./cert/cert.pem'), // Replace with the path to your certificate
 };
 https.createServer(options, app).listen(PORT, () => {
   console.log(`server started : https://localhost:${PORT}`);
 });

