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

var newUser = {
		company: null,
		name: null,
		title: null,
		email: null,
		phone: null,
        auth_token: null,
        username: null,
        password: null,
        dev_id_1: null,
        dev_id_2: null,
        dev_id_3: null,
        dev_id_4: null,
        dev_id_5: null,
        dev_id_6: null
	};

var createUser = function(newUser, req, res) {
		
		var user = newUser;
		user.company = req.company;
		user.name = req.name;
		user.title = req.title;
		user.email = req.email;
		user.phone = req.phone;
		user.auth_token = req.auth_token;
		user.username = req.username;
		user.password = req.password;
		user.dev_id_1 = req.dev_id_1;
		user.dev_id_2 = req.dev_id_2;
		user.dev_id_3 = req.dev_id_3;
		user.dev_id_4 = req.dev_id_4;
		user.dev_id_5 = req.dev_id_5;
		user.dev_id_6 = req.dev_id_6;			   			
	db.insert(user, user.email, function(err, doc){
		if(err) {
			console.log(err);
			res.sendStatus(500);
		} else
			res.sendStatus(200);
		res.end()
	});
}


router.post('/register', function(req, res, next) { 
	  createUser();	
      req.flash('sucess', 'You are now registered and can login');
      res.location('/');
      res.redirect('/');
  }
});





module.exports = router;