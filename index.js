const express = require('express')
const app = express()
const port = 3000
const mascotas = require('./data/db.json');

app.get('/', (req, res) => {
  res.json(mascotas)
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

