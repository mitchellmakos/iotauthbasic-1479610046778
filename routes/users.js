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
var company=req.body.company;
var name=req.body.name;
var email=req.body.email;
var auth_token=req.body.auth_token;
var username=req.body.username;
var password=req.body.password;
var dev_id_1=req.body.dev_id_1;
var dev_id_2=req.body.dev_id_2;
var dev_id_3=req.body.dev_id_3;
var dev_id_4=req.body.dev_id_4;
var dev_id_5=req.body.dev_id_5;
var dev_id_6=req.body.dev_id_6;

  req.checkBody('company','Name field is required').notEmpty();
  req.checkBody('name','Email field is required').notEmpty();
  req.checkBody('email','Email is not valid').isEmail();
  req.checkBody('auth_token','Username field is required').notEmpty();
  req.checkBody('username','Password field is required').notEmpty();
  req.checkBody('password','Password field is required').notEmpty();
  req.checkBody('password2','Passwords do not match').equals(req.body.password);
  req.checkBody('dev_id_1','Password field is required').notEmpty();

  // Check Errors
  var errors = req.validationErrors();

  if(errors){
  	res.render('register', {
  		errors: errors
  	});
  } else{	

	db.insert({
		"company": company,
		"name": name,
		"email": email,
		"auth_token": auth_token,
		"uaername": username,
		"password": password,
		"dev_id_1": dev_id_1,
		"dev_id_2": dev_id_2,
		"dev_id_3": dev_id_3,
		"dev_id_4": dev_id_4,
		"dev_id_5": dev_id_5,
		"dev_id_6": dev_id_6}, null, function(err, body){
			if(!err){
				console.log(body);
			}
			res.redirect('/');
		});
		
});

module.exports = router;