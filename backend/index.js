require('dotenv').config()
const express = require('express')
const app = express()


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



const {encrypt,decrypt} = require('./helper/encrypt_decrypt')

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.post('/', (req, res) => {
  res.send('post data!')
})



const port = 3000
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})