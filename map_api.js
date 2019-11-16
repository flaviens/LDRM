
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('{RED: [{x: 12.32156, y: 87.34362}, {x: 25.32963, y: 67.65422}, {x: 81.23594, y: 14.82645}], YELLOW: [{x: 41.23569, y: 84.25649}, {x: 73.26459, y: 85.13698}], GREEN: [{x: 74.36953, y: 11.25332}, {x: 91.55669, y: 81.36547}]}')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

