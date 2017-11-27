var CheckLog=require('../CheckLogin');
var Promo = require('../Models/promosModel');

module.exports = function(app, passport) {

	// =====================================
	// PAGE ACCUEIL ========
	// =====================================

	app.get('/', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	app.get('/login', function(req, res) {
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	app.post('/login', function(req, res) {
		var returnTo = req.session.returnTo||'redirectByRole';
		passport.authenticate('local-login', {
            successRedirect : returnTo,
            failureRedirect : '/login',
            failureFlash : true
		})(req, res	);
	});

    // après envoi du formulaire login, redirectByRole redirige le profil actif vers la page correposdant à son role
    app.get('/redirectByRole', function(req, res) {

    	switch(req.user.roleU){
			case "ETUDIANT":
				var returnTo = "profile";
				break;
			case "ENSEIGNANT":
				var returnTo = "enseignant/seance";
				break;
			case "ADMINISTRATION":
				var returnTo = "admin/";
				break;
		}
        res.redirect(returnTo);
    });

	app.get('/admin/users/create', function(req, res, next){ CheckLog(req, res, next, "ADMINISTRATION");}, function(req, res) {
        var query = Promo.ObtAllPromos(function (err, rows) {
            if (err)
                res.render('errorRequest.ejs', {page_title:"Error", ressource: "/admin/users/"});
             if(rows.length<=0)
             {
                 res.render('errorRessource.ejs', {page_title:"Error", ressource:"/admin/users/create"});
             }
            res.render('Users/createUser.ejs', {page_title:"createUser", promos:rows, chemin:"/admin/users/"});
        });
	});

	app.post('/admin/users', passport.authenticate('local-signup', {
		successRedirect : '/admin/users',
		failureRedirect : '/admin/users/create',
		failureFlash : true // allow flash messages
	}));

	app.get('/profile',function(req, res) {
		if(req.session.user){console.log(req.session)}

		res.render('profile.ejs', {
			user : req.user
		});
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

    // =====================================
    // ADMIN ===============================
    // =====================================
    app.get('/admin',function(req, res, next){ CheckLog(req, res, next, "ADMINISTRATION");}, function (req, res){
        console.log('dans la route admin ejs');
        res.render('admin.ejs', {page_title:"Administration"});
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        req.session.returnTo=null;
        res.redirect('/');
    });
};
