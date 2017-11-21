var CheckLog=require('../CheckLogin');
var Promo = require('../Models/promosModel');

// app/routes.js
module.exports = function(app, passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		res.render('index.ejs'); // load the index.ejs file
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/login', function(req, res) {
		var returnTo = req.session.returnTo||'profile';
		passport.authenticate('local-login', {
            successRedirect : returnTo, // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
		})(req, res	);
		/*function(req, res) {
            console.log("hello");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
	      res.redirect('/');
    	}*/
	});

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/admin/users/create', function(req, res, next){ CheckLog(req, res, next, "ADMINISTRATION");}, function(req, res) {
        var query = Promo.ObtAllPromos(function (err, rows) {
            if (err)
                console.log("Error Selecting : %s ", err);
             if(rows.length<=0)
             {
                 res.render('errorRessource.ejs', {page_title:"Error", ressource:"/admin/users/create"});
             }
            res.render('createUser.ejs', {page_title:"createUser", promos:rows, chemin:"/admin/users/"});
        });
	});

	// process the signup form
	app.post('/admin/users', passport.authenticate('local-signup', {
		successRedirect : '/admin/users',
		failureRedirect : '/admin/users/create',
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)

	app.get('/profile',function(req, res) {
		if(req.session.user){console.log(req.session)}

		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};
