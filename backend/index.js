require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000

const {encrypt,decrypt} = require('./helper/encrypt_decrypt')

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.post('/', (req, res) => {
  res.send('post data!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})