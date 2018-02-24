const express = require('express')
const router = express.Router()
const sample = require('./sample');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route

// define the about route
router.get('/tour', function(req, res) {
  console.log('incoming request');
  res.send(JSON.stringify(sample))
})

module.exports = router