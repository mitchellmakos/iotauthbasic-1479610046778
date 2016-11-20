var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('dashboard');
});

router.get('/login', function(req, res, next) {
  res.send('login');
});

router.get('/register', function(req, res, next) {
  res.send('register');
});



module.exports = router;