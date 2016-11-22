var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Cloudant = require('cloudant');
var vcapServices = require('../vcapServices');

var cloudant_service = vcapServices.cloudantNoSQLDB[0].credentials;
var cloudant = Cloudant({account:cloudant_service.username, password:cloudant_service.password});
var db = cloudant.db.use('users');



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('dashboard');
});

router.get('/login', function(req, res, next) {
  res.render('login', {title: 'Login'});
});

router.get('/register', function(req, res, next) {
  res.render('register', {title: 'Register'});
});

router.post('/register', function(req, res) { 
var company = req.body.company;
var name = req.body.name;
var title = req.body.title;


	db.insert({"company": company,
		"name": name,
		"title": title}, null, function(err, body){
			if(!err){
				console.log(body);
			}
		});
	res.redirect('/');	
		
});






module.exports = router;